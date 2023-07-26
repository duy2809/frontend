// Demo component

import { Typography, Box } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { FC } from 'react';

const OrderResult: FC = () => (
  <>
    <HelmetMeta title="Payment Result" />
    <Box
      display="flex"
      marginTop={10}
      alignItems="center"
      flexDirection="column"
    >
      <CheckCircleOutlineIcon
        sx={{ fontSize: 70, marginBottom: 3 }}
        color="success"
      />
      <Typography variant="h3">Order successful!</Typography>
      <Typography variant="h5" mx={30} my={5}>
        Your order has been successfully processed. Thank you for shopping with
        us!
      </Typography>
      <Link to="/">Back to home</Link>
    </Box>
  </>
);

export default OrderResult;
