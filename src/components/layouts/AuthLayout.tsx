// Demo component

import { Box } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => (
  <Box display="flex">
    <Outlet />
  </Box>
);

export default AuthLayout;
