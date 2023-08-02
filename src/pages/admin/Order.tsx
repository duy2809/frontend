/* eslint-disable @typescript-eslint/no-explicit-any */
// Demo component

import { Typography, Box, Toolbar, Paper } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { getOrdersThunk } from 'app/store/features/order/orderThunk';
import { Order as OrderType } from '../../modals/Order';
import { formatPrice } from 'utils/functions';
import { format } from 'date-fns';
import { resetOrders } from 'app/store/features/order/orderSlice';

const calculateTotal = (list: any[]): number => {
  let total = 0;
  list.forEach((item) => {
    if (item) {
      const { product, quantity } = item;
      const { price } = product;
      if (price && quantity) {
        total += price * quantity;
      }
    }
  });
  return total;
};

const Order: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.orders.data);

  interface Column {
    id: 'id' | 'total' | 'user' | 'payment' | 'created_at' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'id', label: 'ID' },
    { id: 'user', label: 'User' },
    { id: 'payment', label: 'Payment method' },
    { id: 'total', label: 'Total' },
    { id: 'status', label: 'Status' },
    { id: 'created_at', label: 'Order Placed Time' },
  ];

  interface Data {
    id: number;
    user: string | undefined;
    payment: string | undefined;
    total: string | undefined | number;
    created_at: string;
    status: string;
  }

  function createDataRow(list: OrderType[]): Data[] {
    const data: Data[] = [];
    list.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, created_at, status, user, payment } = item;
      const total = formatPrice(calculateTotal(item.orderToProducts));
      data.push({
        id,
        user: user?.name,
        payment: payment?.name,
        total,
        created_at: format(new Date(created_at), 'dd-MM-yyyy HH:mm'),
        status,
      });
    });
    return data;
  }

  const rows = orders ? createDataRow(orders) : [];

  useEffect(() => {
    dispatch(resetOrders());
    dispatch(getOrdersThunk());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!orders || rows.length === 0) {
    return (
      <>
        <HelmetMeta title="Order History" />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h4" sx={{ mb: 3 }}>
            Orders
          </Typography>
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <Typography variant="h5" sx={{ p: 3 }}>
              No orders found
            </Typography>
          </Paper>
        </Box>
      </>
    );
  }

  return (
    <>
      <HelmetMeta title="Order" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 5 }}>
          Orders
        </Typography>
        <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 700 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Order;
