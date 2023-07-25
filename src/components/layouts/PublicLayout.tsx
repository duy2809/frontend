// Demo component

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout: FC = () => (
  <Box>
    <Navbar admin={false} />
    <Container maxWidth="xl">
      <Toolbar />
      <Outlet />
    </Container>
    <Footer />
  </Box>
);

export default PublicLayout;
