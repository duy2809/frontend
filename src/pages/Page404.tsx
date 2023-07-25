// Demo component

import { Typography, Box } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FC } from 'react';

const Page404: FC = () => (
  <>
    <HelmetMeta title="404" />
    <Box
      display="flex"
      marginTop={10}
      alignItems="center"
      flexDirection="column"
    >
      <ErrorOutlineIcon sx={{ fontSize: 70, marginBottom: 3 }} />
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">Page not found</Typography>
    </Box>
  </>
);

export default Page404;
