// Demo component

import {
  Typography,
  Box,
  Breadcrumbs,
  Button,
  Rating,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { FC, useState } from 'react';
import * as React from 'react';
import HelmetMeta from 'components/common/HelmetMeta';
import { styled } from '@mui/material/styles';
import Image from 'components/common/Image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useAppDispatch } from 'app/hooks/redux';
import { addToCart } from 'app/store/features/cart/cartSlice';
import { Link, useParams } from 'react-router-dom';
import { allProducts } from 'utils/data';
import { deepClone, formatPrice, toTitleCase } from 'utils/functions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ImageWrapper = styled(Box)({
  width: '50%',
  height: '20%',
});

const ItemImage = styled(Image)({
  width: '100%',
});

const ProductPrice = styled(Typography)({
  color: 'red',
  fontSize: 30,
  fontWeight: 500,
  marginTop: '1rem',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
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

const ProductDetail: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const product = allProducts.find((item) => item?.id === Number(id));

  const rows: JSX.Element[] = [];
  let specs: Record<string, unknown> = {};
  if (product) specs = deepClone(product.specs);

  Object.keys(specs).forEach((category) => {
    const categoryObj = specs[category] as Record<string, string>;
    Object.keys(categoryObj).forEach((key) => {
      const value = categoryObj[key];
      rows.push(
        <StyledTableRow key={`${category}-${key}`}>
          <StyledTableCell>{toTitleCase(key)}</StyledTableCell>
          <StyledTableCell>{value}</StyledTableCell>
        </StyledTableRow>,
      );
    });
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const breadcrumbs = [
    <Link key="1" to="/">
      Home
    </Link>,
    <Typography key="2" color="text.primary" noWrap width={300}>
      {product?.name}
    </Typography>,
  ];

  return (
    <>
      <HelmetMeta title={product?.name} />
      <Breadcrumbs
        sx={{ mt: 3, mb: 3 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box display="flex">
        <ImageWrapper>
          <Swiper
            navigation
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
          >
            {product?.images.map((image) => (
              <SwiperSlide>
                <ItemImage src={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageWrapper>
        <Box
          sx={{
            ml: 5,
            width: '50%',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {product?.name}
          </Typography>
          <Rating name="read-only" value={4} readOnly sx={{ mt: 2, mb: 2 }} />
          <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
            {product?.descriptions.map((description) => (
              <ListItem
                sx={{ display: 'list-item' }}
                key={description}
                disablePadding
              >
                <ListItemText
                  primary={description}
                  primaryTypographyProps={{ fontSize: 16 }}
                />
              </ListItem>
            ))}
          </List>
          <ProductPrice>{formatPrice(product?.price)}</ProductPrice>
          <Button
            variant="contained"
            color="error"
            sx={{ width: '50%', paddingY: 1, mt: 3 }}
            endIcon={<AddShoppingCartIcon />}
            onClick={() => {
              if (product) dispatch(addToCart(product));
              handleClick();
            }}
          >
            Add to Cart
          </Button>
          <Snackbar
            open={open}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Add to cart successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Learn more about {product?.specs?.model?.brand}{' '}
          {product?.specs?.model?.model}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: '70%', marginBottom: 10 }}
        >
          <Table>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ProductDetail;
