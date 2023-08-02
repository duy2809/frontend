/* eslint-disable @typescript-eslint/no-explicit-any */
// Demo component

import { Typography, Box, Toolbar, Paper, Chip } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { getOrdersByUserThunk } from 'app/store/features/order/orderThunk';
import { Order as OrderType } from '../../modals/Order';
import { formatPrice } from 'utils/functions';
import { format, utcToZonedTime } from 'date-fns-tz';
import { resetOrdersByUser } from 'app/store/features/order/orderSlice';

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

const chipColor = (status: string | number | undefined) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Paid':
      return 'success';
    case 'Failed':
      return 'error';
    default:
      return 'info';
  }
};

const Order: FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.ordersByUser.data);
  const user = useAppSelector((state) => state.auth.user.data);

  interface Column {
    id: 'id' | 'total' | 'created_at' | 'status' | 'detail';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'id', label: 'Order ID' },
    { id: 'total', label: 'Total' },
    { id: 'created_at', label: 'Order Placed Time' },
    { id: 'status', label: 'Status' },
    { id: 'detail', label: 'Detail' },
  ];

  interface Data {
    id: number;
    total: string | undefined | number;
    created_at: string;
    status: string;
    detail: string;
  }

  function createDataRow(list: OrderType[]): Data[] {
    const data: Data[] = [];
    list.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, created_at, status } = item;
      const total = formatPrice(calculateTotal(item.orderToProducts));
      const date = new Date(created_at);
      const zonedTime = utcToZonedTime(date, 'Asia/Ho_Chi_Minh')
      data.push({
        id,
        total,
        created_at: format(zonedTime, 'dd-MM-yyyy HH:mm'),
        status,
        detail: `/user/order-detail/${id}`,
      });
    });
    return data;
  }

  const rows = orders ? createDataRow(orders) : [];

  useEffect(() => {
    dispatch(resetOrdersByUser());
    if (user) dispatch(getOrdersByUserThunk(user.id));
  }, [dispatch, user]);

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
            Order history
          </Typography>
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <Typography variant="h5" sx={{ p: 3 }}>
              You have no orders yet
            </Typography>
          </Paper>
        </Box>
      </>
    );
  }

  return (
    <>
      <HelmetMeta title="Order History" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Order history
        </Typography>
        <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
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
                        if (column.id === 'status') {
                          return (
                            <TableCell key={column.id} align="left">
                              <Chip
                                label={value as string}
                                color={chipColor(value)}
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === 'detail') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link
                                style={{
                                  color: 'blue',
                                  textDecoration: 'underline',
                                }}
                                to={value as string}
                              >
                                View detail
                              </Link>
                            </TableCell>
                          );
                        }
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
