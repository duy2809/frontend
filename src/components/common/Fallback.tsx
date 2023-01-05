// Demo component

import { FC } from 'react';
import { Box, LinearProgress } from '@mui/material';

const Fallback: FC = () => (
  <Box sx={{ width: '100%' }}>
    <LinearProgress />
  </Box>
);

export default Fallback;
