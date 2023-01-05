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
import Image from 'components/common/Image';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from 'app/store/features/cart/cartSlice';
import { calculateSum, formatPrice } from 'utils/functions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

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
  width: 180,
});

const ItemImage = styled(Image)({
  width: '100%',
});

const ProductText = styled(Typography)({
  fontSize: 19,
  fontWeight: 500,
});

const ProductName = styled(ProductText)({
  width: '40%',
});

const ProductQuantity = styled(ProductText)({
  fontWeight: 'normal',
});

const ProductPrice = styled(ProductText)({
  color: 'red',
  width: '20%',
});

const SummaryWrap = styled(Paper)({
  width: '30%',
  padding: 20,
  display: 'inline',
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  },
  height: 'fit-content',
  position: 'sticky',
  top: 100,
});

const SummaryPrice = styled(ProductText)({
  color: 'red',
});

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
              const { id, name, imageUrl, price, quantity } = item;
              return (
                <ItemWrapper variant="outlined">
                  <ImageWrapper>
                    <ItemImage src={imageUrl} alt="Product image" />
                  </ImageWrapper>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}
                  >
                    <ProductName align="left">{name}</ProductName>
                    <IconButton aria-label="remove">
                      <RemoveIcon
                        fontSize="inherit"
                        onClick={() => {
                          dispatch(decrementQuantity(id));
                        }}
                      />
                    </IconButton>
                    <ProductQuantity>{quantity}</ProductQuantity>
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
              Order &gt;
            </Button>
            <Snackbar
              open={open}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                Order successfully!
              </Alert>
            </Snackbar>
          </SummaryWrap>
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
