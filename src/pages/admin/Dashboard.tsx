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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { getUsersThunk } from 'app/store/features/user/userThunk';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

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

import { formatPrice } from 'utils/functions';

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
    title: 'Blogs',
    path: 'blogs',
    color: 'green',
    percent: 4,
    trendIcon: <KeyboardArrowUpIcon color="success" fontSize="large" />,
    icon: <BookIcon />,
  },
  {
    id: 5,
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
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const Dashboard: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const users = useAppSelector((state) => state.user.users.data);

  useEffect(() => {
    dispatch(getUsersThunk());
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

  const totalCalculate = (property: string) => {
    switch (property) {
      case 'users': {
        return users.length;
      }
      default:
        return Math.floor(Math.random() * 100 + 50);
    }
  };

  return (
    <>
      <HelmetMeta title={t('dashboard.title')} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t('dashboard.title')}
        </Typography>
        <Box display="flex" sx={{ flexWrap: 'wrap', mb: 3 }}>
          {dashboardData.map(
            ({ id, title, icon, path, trendIcon, color, percent }) => (
              <Link to={`/admin/${path}`} key={id}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    width: 250,
                    marginRight: 3,
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
              Chart
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
                  dataKey="amt"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
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
                        key={row.code}
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
