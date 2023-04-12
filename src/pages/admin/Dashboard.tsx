// Demo component

import { Typography, Box, Toolbar, Paper } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListIcon from '@mui/icons-material/List';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BookIcon from '@mui/icons-material/Book';

import {
  ResponsiveContainer,
  LineChart,
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
    total: 720,
    color: 'green',
    percent: 15,
    trendIcon: <KeyboardArrowUpIcon color="success" fontSize="large" />,
    icon: <AccountBoxIcon />,
  },
  {
    id: 2,
    title: 'Products',
    path: 'products',
    total: 200,
    color: 'green',
    percent: 5,
    trendIcon: <KeyboardArrowUpIcon color="success" fontSize="large" />,
    icon: <InventoryIcon />,
  },
  {
    id: 3,
    title: 'Orders',
    path: 'orders',
    total: 10,
    color: 'red',
    percent: 3,
    trendIcon: <KeyboardArrowDownIcon color="error" fontSize="large" />,
    icon: <ListIcon />,
  },
  {
    id: 4,
    title: 'Blogs',
    path: 'blogs',
    total: '20',
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
            ({ id, title, total, icon, path, trendIcon, color, percent }) => (
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
                    <Typography variant="h5">{total}</Typography>
                    {icon}
                  </Box>
                </Paper>
              </Link>
            ),
          )}
        </Box>
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
          <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
            Chart
          </Typography>
          <ResponsiveContainer className="chart" height={400}>
            <LineChart
              width={400}
              height={300}
              data={chartData}
              // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              margin={{ top: 10 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </>
  );
};

export default Dashboard;
