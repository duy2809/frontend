/* eslint-disable */

import {
  Typography,
  Box,
  Toolbar,
  Paper,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Snackbar,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import HelmetMeta from 'components/common/HelmetMeta';
import React, { FC, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialReactTable, {
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
} from 'material-react-table';
import { Add } from '@mui/icons-material';
import { Product } from 'modals/Product';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { getCrawlProductsThunk } from 'app/store/features/product/productThunk';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

import { Image } from 'modals/Image';
import { formatPrice } from 'utils/functions';

const CrawlPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [source, setSource] = useState('');
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setRowSelection({});
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

  const crawlProducts = useAppSelector((state) => state.product.crawlProducts.data);
  const loading = useAppSelector((state) => state.product.crawlProducts.loading);

  const handleChange = (event: SelectChangeEvent) => {
    setSource(event.target.value as string);
    setRowSelection({});
    dispatch(getCrawlProductsThunk(event.target.value));
  };

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
        size: 40,
        Cell: ({ cell }) => <Typography>{cell.getValue<string>()}</Typography>
      },
      {
        accessorKey: 'images',
        header: 'Images',
        size: 40,
        Cell: ({ cell }) => (
          <Box sx={{
            width: 100,
            height: 85,
          }}>
            <img
              src={cell.getValue<Image[]>()[0].url}
              alt="product"
              width="100%"
            />
          </Box>
        )
      },
      {
        accessorKey: 'name',
        header: 'Name',
        minSize: 500,
        Cell: ({ cell }) => <Typography>{cell.getValue<string>()}</Typography>
      },
      {
        accessorKey: 'price',
        header: 'Price',
        size: 40,
        Cell: ({ cell }) => <Typography>{formatPrice(cell.getValue<number>())}</Typography>
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 40,
        Cell: ({ cell }) => <Typography>{cell.getValue<number>()}</Typography>
      },
    ],
    [],
  );

  return (
    <>
      <HelmetMeta title={t('dashboard.title')} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }} >
          <Box display="flex" alignItems="center">
            <Typography variant="h4" sx={{ mr: 5 }}>Crawl</Typography>
            <Box sx={{ minWidth: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Source</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={source}
                  label="Source"
                  onChange={handleChange}
                >
                  <MenuItem value='newegg'>newegg.com</MenuItem>
                  <MenuItem value='anphat'>anphatpc.com.vn</MenuItem>
                  <MenuItem value='ncpc'>nguyencongpc.vn</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Button
            disabled={Object.keys(rowSelection).length === 0}
            color="primary"
            onClick={() => handleClick()}
            variant="contained"
            startIcon={<Add />}
          >
            Add To Product Table
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
                Add to product table successfully!
            </Alert>
          </Snackbar>
        </Box>
        <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
          <MaterialReactTable
            columns={columns}
            data={crawlProducts ?? []}
            enableRowSelection
            getRowId={(row) => row.id ? row.id.toString() : Math.random().toString()}
            onRowSelectionChange={setRowSelection}
            state={{
              rowSelection,
              isLoading: loading,
            }}
          />
        </Paper>
      </Box>
    </>
  );
};

export default CrawlPage;
