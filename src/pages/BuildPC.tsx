/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Demo component

import {
  Typography,
  Breadcrumbs,
  IconButton,
  Button,
  Box,
  Table,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import HelmetMeta from 'components/common/HelmetMeta';

import {
  cpuData,
  motherboardData,
  memoryData,
  storageData,
  videocardData,
  cpucoolerData,
  caseData,
  powersupplyData,
  osData,
  monitorData,
  expansioncardData,
} from 'utils/data';
import { formatPrice, toTitleCase } from 'utils/functions';
import Image from 'components/common/Image';

import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Product } from 'modals/Product';
import { useAppDispatch } from 'app/hooks/redux';
import { addToCart } from 'app/store/features/cart/cartSlice';

const breadcrumbs = [
  <Link key="1" to="/">
    Home
  </Link>,
  <Typography key="2" color="text.primary">
    Build PC
  </Typography>,
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ItemWrapper = styled(Paper)({
  display: 'flex',
  cursor: 'pointer',
  marginBottom: 12,
  marginTop: 12,
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  },
});

const SeletedItemWrapper = styled(Box)({
  display: 'flex',
});

const ImageWrapper = styled(Box)({
  width: 170,
  padding: 10,
  marginRight: 5,
});

const ItemImage = styled(Image)({
  width: '100%',
});

const ProductText = styled(Typography)({
  fontSize: 19,
  fontWeight: 500,
});

const ProductName = styled(ProductText)({
  width: '70%',
});

const ProductPrice = styled(ProductText)({
  color: 'red',
  width: '15%',
});

const sumPrice = (system: System): number => {
  let sum = 0;
  const arraySystem = Object.values(system);
  arraySystem.forEach((item: Product | null) => {
    if (item) sum += item.price;
  });
  return sum;
};

type Component = string;

interface CPU extends Product {
  specs: {
    model: {
      brand: string;
      processorType: string;
      series: string;
      name: string;
      model: string;
    };
    details: {
      cpuSocketType: string;
    };
  };
}

interface Motherboard extends Product {
  specs: {
    model: {
      brand: string;
      model: string;
    };
    supportedCpu: {
      cpuSocketType: string;
      cpuType: string;
    };
  };
}

interface System {
  [key: string]: Product | null;
}

const rows: Component[] = [
  'cpu',
  'motherboard',
  'memory',
  'storage',
  'videoCard',
  'cpuCooler',
  'case',
  'powerSupply',
  'operatingSystem',
  'monitor',
  'expansionCards',
  'peripherals',
  'accessories',
];

const ListWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const initialSystem: { [key: string]: Product | null } = {};
const initialData: Product[] = [];
const initialSocket = '';

const dataMapping: { [key: string]: Product[] } = {
  cpu: cpuData,
  motherboard: motherboardData,
  memory: memoryData,
  storage: storageData,
  videoCard: videocardData,
  cpuCooler: cpucoolerData,
  case: caseData,
  powerSupply: powersupplyData,
  operatingSystem: osData,
  monitor: monitorData,
  expansionCards: expansioncardData,
};

const BuildPC: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState('');
  const [system, setSystem] = useState(initialSystem);
  const [data, setData] = useState(initialData);
  const [socket, setSocket] = useState(initialSocket);

  const handleClickOpen = (row: Component) => {
    setOpen(true);
    setComponent(row);
    if (row === 'cpu' && socket) {
      const filteredCpuList = cpuData.filter((cpu) =>
        cpu.specs.details.cpuSocketType.includes(socket),
      );
      setData(filteredCpuList);
    } else if (row === 'motherboard' && socket) {
      const filteredMotherBoardList = motherboardData.filter((mb) =>
        mb.specs.supportedCpu.cpuSocketType.includes(socket),
      );
      setData(filteredMotherBoardList);
    } else setData(dataMapping[row] || []);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (item: Product) => {
    setSystem({ ...system, [component]: item });
    if (component === 'cpu') {
      setSocket(
        (item as CPU).specs.details.cpuSocketType.replace(/Socket /g, ''),
      );
    } else if (component === 'motherboard') {
      setSocket(
        (item as Motherboard).specs.supportedCpu.cpuSocketType
          .replace(/\*.*$/, '')
          .trim(),
      );
    }
    handleClose();
  };

  const handleDelete = (row: Component) => {
    if (row === 'cpu') {
      if (!system.motherboard) setSocket('');
    } else if (row === 'motherboard') if (!system.cpu) setSocket('');
    setSystem({ ...system, [row]: null });
  };

  return (
    <>
      <HelmetMeta title="Build PC" />
      <Breadcrumbs
        sx={{ mt: 3, mb: 3 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant="h4">⚒️ BUILD YOUR PC</Typography>
        {/* {socket && <Chip label={`Socket: ${socket}`} variant="outlined" />} */}
        {socket && (
          <Paper elevation={2} sx={{ py: 0.75, px: 2.5 }}>
            <Typography variant="h6">Socket: {socket}</Typography>
          </Paper>
        )}
        <ProductPrice sx={{ width: 'inherit', fontSize: 23 }}>
          Estimated cost: {formatPrice(sumPrice(system))}
        </ProductPrice>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 3, mb: 3 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={450}>
                <ProductName>Component</ProductName>
              </StyledTableCell>
              <StyledTableCell align="left">
                <ProductName>Selection</ProductName>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const selected: Product | null = system[row];
              return (
                <StyledTableRow key={row}>
                  <StyledTableCell component="th" scope="row" width={450}>
                    <ProductName>
                      {index + 1}. {toTitleCase(row)}
                    </ProductName>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {selected ? (
                      <SeletedItemWrapper>
                        <ImageWrapper>
                          <ItemImage
                            src={selected.images[0]}
                            alt="Product image"
                          />
                        </ImageWrapper>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                          }}
                        >
                          <ProductName align="left">
                            {selected.name}
                          </ProductName>
                          <ProductPrice align="right">
                            {formatPrice(selected.price)}
                          </ProductPrice>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(row)}
                          >
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </SeletedItemWrapper>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleClickOpen(row)}
                      >
                        Choose {toTitleCase(row)}
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Choose {toTitleCase(component)}</DialogTitle>
        <DialogContent dividers>
          <ListWrapper>
            {data.map((item) => {
              const { name, images, price } = item;
              return (
                <ItemWrapper
                  variant="outlined"
                  onClick={() => handleSelect(item)}
                >
                  <ImageWrapper>
                    <ItemImage src={images[0]} alt="Product image" />
                  </ImageWrapper>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}
                  >
                    <ProductName align="left">{name}</ProductName>
                    <ProductPrice align="right">
                      {formatPrice(price)}
                    </ProductPrice>
                  </Box>
                </ItemWrapper>
              );
            })}
          </ListWrapper>
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ width: '15%', mr: 5 }}
          endIcon={<AddShoppingCartIcon />}
          onClick={() => {
            if (system) {
              const arraySystem = Object.values(system);
              arraySystem.forEach((item: Product | null) => {
                if (item) {
                  dispatch(addToCart(item));
                }
              });
            }
          }}
        >
          Add to Cart
        </Button>
        <ProductPrice sx={{ width: 'inherit', fontSize: 23 }}>
          Estimated cost: {formatPrice(sumPrice(system))}
        </ProductPrice>
      </Box>
    </>
  );
};

export default BuildPC;
