// Demo component

import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

const PublicLayout: FC = () => (
  <Container maxWidth="xl">
    <Outlet />
  </Container>
);

export default PublicLayout;
