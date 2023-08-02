/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// Demo component

import {
  Typography,
  Box,
  Toolbar,
  Paper,
  styled,
  Divider,
  Chip,
} from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { getOrdersByUserThunk } from 'app/store/features/order/orderThunk';
import { calculateSum, formatPrice } from 'utils/functions';
import { format } from 'date-fns';
import { resetOrdersByUser } from 'app/store/features/order/orderSlice';

import { useParams } from 'react-router-dom';
import Image from 'components/common/Image';
import { CartItem } from 'app/store/features/cart/cartSlice';
import { Order } from 'modals/Order';

import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';

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
  top: 250,
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

const OrderDetail: FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user.data);
  const orders = useAppSelector((state) => state.order.ordersByUser.data);
  const order: Order | undefined = orders.find(
    (item) => Number(item?.id) === Number(id),
  );
  const cart: CartItem[] = [];
  const { orderToProducts } = order || {};
  if (orderToProducts) {
    orderToProducts.forEach((item) => {
      const { product, quantity } = item;
      cart.push({ ...product, quantityInCart: quantity });
    });
  }

  const chipColor = (status: string | undefined) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Paid':
        return 'success';
      case 'Failed':
        return 'error';
      default:
        return 'info';
    }
  };

  useEffect(() => {
    dispatch(resetOrdersByUser());
    if (user) dispatch(getOrdersByUserThunk(user.id));
  }, [dispatch, user]);

  return (
    <>
      <HelmetMeta title="Order Detail" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box display="flex">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Order #{id}
          </Typography>
          <Chip
            color={chipColor(order?.status)}
            label={order?.status}
            sx={{ ml: 2 }}
          />
        </Box>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Date:{' '}
          {format(new Date(order?.created_at || '1970-01-01'), 'dd/MM/yyyy')}
        </Typography>
        {cart && (
          <CartWrapper>
            <CartListWrapper>
              {cart.map((item) => {
                const { name, images, price, quantityInCart } = item;
                const itemId = item.id;
                return (
                  <ItemWrapper variant="outlined" key={itemId}>
                    <ImageWrapper>
                      <ItemImage src={images[0].url} alt="Product image" />
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
                      <ProductQuantity>Qty: {quantityInCart}</ProductQuantity>
                      <ProductPrice align="right">
                        {formatPrice(price)}
                      </ProductPrice>
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
                <Typography variant="h6">{order?.payment.name}</Typography>
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
                    marginTop: 2,
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <SummaryPrice sx={{ fontSize: 25 }}>
                    {formatPrice(calculateSum(cart))}
                  </SummaryPrice>
                </Box>
              </SummaryWrap>
            </RightColumn>
          </CartWrapper>
        )}
      </Box>
    </>
  );
};

export default OrderDetail;
