/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Demo component

import {
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  IconButton,
  Button,
  Divider,
  Snackbar,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import PaymentsIcon from '@mui/icons-material/Payments';
import Image from 'components/common/Image';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from 'app/store/features/cart/cartSlice';
import { calculateSum, formatPrice } from 'utils/functions';
import { postPaymentThunk } from 'app/store/features/payment/paymentThunk';
import { postOrderThunk } from 'app/store/features/order/orderThunk';

const breadcrumbs = [
  <Link key="1" to="/">
    Home
  </Link>,
  <Typography key="2" color="text.primary">
    Cart
  </Typography>,
];

const CartWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  marginTop: '2rem',
  marginBottom: '2rem',
});

const CartListWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '70%',
});

const ItemWrapper = styled(Paper)({
  display: 'flex',
  marginBottom: 20,
  marginRight: 20,
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  },
});

const ImageWrapper = styled(Box)({
  width: 170,
  padding: 10,
  marginRight: 5,
});

const ItemImage = styled(Image)({
  width: '100%',
});

const ProductText = styled(Typography)({
  fontSize: 19,
  fontWeight: 500,
});

const ProductName = styled(ProductText)({
  width: '50%',
  fontSize: 18,
});

const ProductQuantity = styled(ProductText)({
  fontWeight: 'normal',
});

const ProductPrice = styled(ProductText)({
  color: 'red',
  width: '20%',
});

const SummaryWrap = styled(Paper)({
  padding: 20,
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  },
  height: 'fit-content',
  top: 300,
  position: 'sticky',
});

const PaymentWrap = styled(Paper)({
  padding: 20,
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  },
  top: 100,
  position: 'sticky',
  marginBottom: 20,
});

const RightColumn = styled(Box)({
  width: '30%',
  display: 'inline',
});

const SummaryPrice = styled(ProductText)({
  color: 'red',
});

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const user = useAppSelector((state) => state.auth.user.data);
  const [method, setMethod] = useState('1');

  const handleClick = async () => {
    const products: any[] = [];
    cart.forEach((item) => {
      const { id, quantityInCart } = item;
      products.push({ product_id: id, quantity: quantityInCart });
    });
    if (method === '1') {
      const data = { user_id: user?.id || 2, payment_id: 1, products };
      await dispatch(postOrderThunk(data));
    } else {
      const data = { user_id: user?.id || 2, payment_id: 2, products };
      await dispatch(postOrderThunk(data));
      await dispatch(postPaymentThunk({ amount: calculateSum(cart) }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <HelmetMeta title="Cart" />
      <Breadcrumbs
        sx={{ mt: 3, mb: 3 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant="h5">Shopping Cart ({cart.length})</Typography>
      {cart.length ? (
        <CartWrapper>
          <CartListWrapper>
            {cart.map((item) => {
              const { id, name, images, price, quantityInCart } = item;
              return (
                <ItemWrapper variant="outlined">
                  <ImageWrapper>
                    <ItemImage src={images[0]} alt="Product image" />
                  </ImageWrapper>
                  <Box
                    sx={{
                      width: '85%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}
                  >
                    <ProductName align="left">{name}</ProductName>
                    <IconButton
                      aria-label="remove"
                      onClick={() => {
                        dispatch(decrementQuantity(id));
                      }}
                    >
                      <RemoveIcon fontSize="inherit" />
                    </IconButton>
                    <ProductQuantity>{quantityInCart}</ProductQuantity>
                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        dispatch(incrementQuantity(id));
                      }}
                    >
                      <AddIcon fontSize="inherit" />
                    </IconButton>
                    <ProductPrice align="right">
                      {formatPrice(price)}
                    </ProductPrice>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        dispatch(removeItem(id));
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </ItemWrapper>
              );
            })}
          </CartListWrapper>
          <RightColumn>
            <PaymentWrap variant="outlined">
              <Box display="flex" mb={2}>
                <PaymentsIcon fontSize="large" />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Payment Method
                </Typography>
              </Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={method}
                  onChange={handleChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="COD" />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Internet Banking"
                  />
                </RadioGroup>
              </FormControl>
            </PaymentWrap>
            <SummaryWrap variant="outlined">
              <Box display="flex">
                <ReceiptIcon fontSize="large" />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Summary
                </Typography>
              </Box>
              <Box
                display="flex"
                sx={{
                  marginY: 2,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>Provisional</Typography>
                <ProductText>{formatPrice(calculateSum(cart))}</ProductText>
              </Box>
              <Box
                display="flex"
                sx={{
                  marginY: 2,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>Voucher</Typography>
                <ProductText>0</ProductText>
              </Box>
              <Divider />
              <Box
                display="flex"
                sx={{
                  marginY: 2,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>Total</Typography>
                <SummaryPrice>{formatPrice(calculateSum(cart))}</SummaryPrice>
              </Box>
              <Button
                variant="contained"
                color="error"
                sx={{ width: '100%', paddingY: 1 }}
                onClick={handleClick}
              >
                {method === '1' ? 'Place Order' : 'Pay Now'}
              </Button>
            </SummaryWrap>
          </RightColumn>
        </CartWrapper>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5rem',
          }}
        >
          <ProductionQuantityLimitsIcon fontSize="large" />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Your cart is empty
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Cart;
