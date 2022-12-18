// Demo component

import { Typography } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';

const Page404: FC = () => (
  <>
    <HelmetMeta title="404" />
    <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
      404
    </Typography>
    <Typography variant="body1" sx={{ textAlign: 'center' }}>
      Page not found
    </Typography>
  </>
);

export default Page404;
