// Demo component

import { Box } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AuthLayout: FC = () => (
  <Box display="flex">
    <Navbar admin={false} />
    <Outlet />
  </Box>
);

export default AuthLayout;
