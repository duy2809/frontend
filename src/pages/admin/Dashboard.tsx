/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Demo component

import { Typography, Box, Toolbar, Paper } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListIcon from '@mui/icons-material/List';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/Book';
import StarIcon from '@mui/icons-material/Star';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { getUsersThunk } from 'app/store/features/user/userThunk';
import { formatPrice } from 'utils/functions';
import { getProductsThunk } from 'app/store/features/product/productThunk';
import { getCategoriesThunk } from 'app/store/features/category/categoryThunk';
import { getOrdersThunk } from 'app/store/features/order/orderThunk';
import { Order as OrderType } from 'modals/Order';
import { format } from 'date-fns';

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { getBrandsThunk } from 'app/store/features/brand/brandThunk';

const dashboardData = [
  {
    id: 1,
    title: 'Users',
    path: 'users',
    color: 'green',
    percent: 15,
    trendIcon: <KeyboardArrowUpIcon color="success" fontSize="large" />,
    icon: <AccountBoxIcon />,
  },
  {
    id: 2,
    title: 'Products',
    path: 'products',
    color: 'green',
    percent: 5,
    trendIcon: <KeyboardArrowUpIcon color="success" fontSize="large" />,
    icon: <InventoryIcon />,
  },
  {
    id: 3,
    title: 'Orders',
    path: 'orders',
    color: 'red',
    percent: 3,
    trendIcon: <KeyboardArrowDownIcon color="error" fontSize="large" />,
    icon: <ListIcon />,
  },
  {
    id: 4,
    title: 'Categories',
    path: 'categories',
    color: 'green',
    percent: 4,
    trendIcon: <KeyboardArrowUpIcon color="success" fontSize="large" />,
    icon: <BookIcon />,
  },
  {
    id: 5,
    title: 'Brands',
    path: 'brands',
    color: 'green',
    percent: 3,
    trendIcon: <KeyboardArrowUpIcon color="success" fontSize="large" />,
    icon: <StarIcon />,
  },
  {
    id: 6,
    title: 'Earning',
    path: 'earnings',
    total: formatPrice(10000000),
    color: 'red',
    percent: 10,
    trendIcon: <KeyboardArrowDownIcon color="error" fontSize="large" />,
    icon: <AttachMoneyIcon />,
  },
];

const chartData = [
  { name: 'Q4/2021', console: 4000, pc: 2400, laptop: 2400 },
  { name: 'Q1/2022', console: 3000, pc: 1398, laptop: 2210 },
  { name: 'Q2/2022', console: 2000, pc: 5800, laptop: 2290 },
  { name: 'Q3/2022', console: 2780, pc: 3908, laptop: 2000 },
  { name: 'Q4/2022', console: 1890, pc: 4800, laptop: 2181 },
  { name: 'Q1/2023', console: 2390, pc: 3800, laptop: 2500 },
  { name: 'Q2/2023', console: 3490, pc: 4300, laptop: 2100 },
];

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const users = useAppSelector((state) => state.user.users.data);
  const products = useAppSelector((state) => state.product.products.data);
  const categories = useAppSelector((state) => state.category.categories.data);
  const orders = useAppSelector((state) => state.order.orders.data);
  const brands = useAppSelector((state) => state.brand.brands.data);

  useEffect(() => {
    dispatch(getUsersThunk());
    dispatch(getProductsThunk());
    dispatch(getCategoriesThunk());
    dispatch(getOrdersThunk());
    dispatch(getBrandsThunk());
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

  const calculateEarning = (list: any[]) => {
    let total = 0;
    list.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (item) total += calculateTotal(item.orderToProducts);
    });
    return total;
  };

  const totalCalculate = (property: string) => {
    switch (property) {
      case 'users': {
        return users.length;
      }
      case 'products': {
        return products.length;
      }
      case 'categories': {
        return categories.length;
      }
      case 'orders': {
        return orders.length;
      }
      case 'brands': {
        return brands.length;
      }
      default:
        return formatPrice(calculateEarning(orders));
    }
  };

  interface Column {
    id: 'id' | 'total' | 'created_at' | 'status';
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
  ];

  interface Data {
    id: number;
    total: string | undefined | number;
    created_at: string;
    status: string;
  }

  function createDataRow(list: OrderType[]): Data[] {
    const data: Data[] = [];
    list.forEach((item) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { id, created_at, status } = item;
      const total = formatPrice(calculateTotal(item.orderToProducts));
      data.push({
        id,
        total,
        created_at: format(new Date(created_at), 'dd-MM-yyyy HH:mm'),
        status,
      });
    });
    return data;
  }

  const rows = orders ? createDataRow(orders) : [];

  return (
    <>
      <HelmetMeta title={t('dashboard.title')} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 3 }}>
          {t('dashboard.title')}
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {dashboardData.map(
            ({ id, title, icon, path, trendIcon, color, percent }) => (
              <Link to={`/admin/${path}`} key={id}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    width: 220,
                    marginRight: 3,
                    marginBottom: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                    },
                  }}
                >
                  <Box display="flex" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {title}
                    </Typography>
                    <Box display="flex">
                      {trendIcon}
                      <Typography variant="h6" color={color}>
                        {percent}%
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5">{totalCalculate(path)}</Typography>
                    {icon}
                  </Box>
                </Paper>
              </Link>
            ),
          )}
        </Box>
        <Box display="flex">
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mr: 3,
              width: '45%',
              '&:hover': {
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              },
            }}
          >
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              Revenue Chart
            </Typography>
            <ResponsiveContainer className="chart" height={400}>
              <ComposedChart height={400} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area
                  type="monotone"
                  dataKey="laptop"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar dataKey="pc" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="console" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </Paper>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              '&:hover': {
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              },
              width: '45%',
            }}
          >
            <TableContainer sx={{ maxHeight: 440 }}>
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
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
      </Box>
    </>
  );
};

export default Dashboard;
