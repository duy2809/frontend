/* eslint-disable */

import {
  Typography,
  Box,
  Toolbar,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'material-react-table';
import { Delete, Edit, Add } from '@mui/icons-material';
import { Product, NewProduct } from 'modals/Product';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import {
  getProductsThunk,
  postProductThunk,
  deleteProductThunk,
} from 'app/store/features/product/productThunk';

import { Image } from 'modals/Image';
import { formatPrice } from 'utils/functions';

import { Link } from 'react-router-dom';

interface CreateModalProps {
  columns: MRT_ColumnDef<NewProduct>[];
  onClose: () => void;
  onSubmit: (values: NewProduct) => void;
  open: boolean;
}

// example of creating a mui dialog modal for creating new rows
export const CreateNewProductModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateModalProps) => {
  const [values, setValues] = useState<NewProduct>({
    name: '',
    price: 0,
    quantity: 0,
    descriptions: [''],
    specs: '',
    images: [''],
  });

  const handleSubmit = () => {
    // put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create New Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProductPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Product[]>([]);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const products = useAppSelector((state) => state.product.products.data);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProductsThunk());
    }
  }, [dispatch, products]);

  useEffect(() => {
    setTableData(products);
  }, [products]);

  const handleCreateNewRow = async (values: NewProduct) => {
    await dispatch(postProductThunk(values));
    dispatch(getProductsThunk());
  };

  const handleSaveRowEdits: MaterialReactTableProps<Product>['onEditingRowSave'] =
    // async ({ exitEditingMode, row, values }) => {
    ({ exitEditingMode, row, values }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        // send/receive api updates here, then refetch or update local table data for re-render
        setTableData([...tableData]);
        exitEditingMode(); // required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Product>) => {
      if (
        // eslint-disable-next-line no-restricted-globals, no-alert, @typescript-eslint/restrict-template-expressions
        !confirm(`Are you sure you want to delete ${row.getValue('name')}`)
      ) {
        return;
      }
      // send api delete request here, then refetch or update local table data for re-render
      await dispatch(deleteProductThunk(row.getValue('id')));
      await dispatch(getProductsThunk());
    },
    [dispatch],
  );

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
        Cell: ({ cell, row }) => (
          <Link to={`/detail/${row.getValue<string>('id')}`} key={row.getValue<string>('id')}>
            <Typography>{cell.getValue<string>()}</Typography>
          </Link>
        )
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

  const newColumns = useMemo<MRT_ColumnDef<NewProduct>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
      },
      {
        accessorKey: 'descriptions',
        header: 'Descriptions',
      },
      {
        accessorKey: 'specs',
        header: 'Specs',
      },
      {
        accessorKey: 'images',
        header: 'Images',
      }
    ],
    [],
  );

  return (
    <>
      <HelmetMeta title={t('dashboard.title')} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box display="flex" sx={{ mb: 3, justifyContent: 'space-between' }}>
          <Typography variant="h4">Products</Typography>
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            startIcon={<Add />}
          >
            Create New Product
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
          <MaterialReactTable
            displayColumnDefOptions={{
              'mrt-row-actions': {
                muiTableHeadCellProps: {
                  align: 'center',
                },
                size: 120,
              },
            }}
            // initialState={{ density: 'compact' }}
            columns={columns}
            data={products ?? []}
            state={{
              isLoading: useAppSelector((state) => state.product.products.loading),
            }}
            editingMode="modal" // default
            enableEditing
            onEditingRowSave={handleSaveRowEdits}
            onEditingRowCancel={handleCancelRowEdits}
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteRow(row)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          />
          <CreateNewProductModal
            columns={newColumns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </Paper>
      </Box>
    </>
  );
};

export default ProductPage;
