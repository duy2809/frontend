// Demo component

import { Typography, Box } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useSearchParams } from 'react-router-dom';
import { FC } from 'react';

const PaymentResult: FC = () => {
  const [searchParams] = useSearchParams();
  const result = searchParams.get('result');
  const orderId = searchParams.get('order_id');
  const amount = searchParams.get('amount');

  return (
    <>
      <HelmetMeta title="Payment Result" />
      <Box
        display="flex"
        marginTop={10}
        alignItems="center"
        flexDirection="column"
      >
        {result === 'success' ? (
          <CheckCircleOutlineIcon
            sx={{ fontSize: 70, marginBottom: 3 }}
            color="success"
          />
        ) : (
          <ErrorOutlineIcon
            sx={{ fontSize: 70, marginBottom: 3 }}
            color="error"
          />
        )}
        <Typography variant="h3">
          {result === 'success' ? 'Payment successful!' : 'Payment failed!'}
        </Typography>
        <Typography variant="h5" mx={30} my={5}>
          {result === 'success'
            ? `Your order (Order ID: #${
                orderId || 'undefined'
              }) has been successfully processed. The amount of ${
                amount || 'undefined'
              } VNĐ has been deducted from your account. Thank you for shopping with us!`
            : `We regret to inform you that your payment for order (Order ID: #${
                orderId || 'undefined'
              } - ${
                amount || 'undefined'
              } VNĐ) was not successful. Please check your payment details and try again. If you continue to experience issues, please contact our customer support for further assistance`}
        </Typography>
        <Link to="/">Back to home</Link>
      </Box>
    </>
  );
};

export default PaymentResult;
