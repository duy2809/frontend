// Demo component

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';

const PublicLayout: FC = () => (
  <Box display="flex">
    <Navbar admin={false} />
    <Container maxWidth="xl">
      <Toolbar />
      <Outlet />
    </Container>
  </Box>
);

export default PublicLayout;
