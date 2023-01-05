// Demo component

import {
  Typography,
  Box,
  Breadcrumbs,
  Paper,
  Button,
  Rating,
  Snackbar,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { FC, useState } from 'react';
import * as React from 'react';
import HelmetMeta from 'components/common/HelmetMeta';
import { styled } from '@mui/material/styles';
import Image from 'components/common/Image';

import { useAppDispatch } from 'app/hooks/redux';
import { addToCart } from 'app/store/features/cart/cartSlice';
import { Link, useParams } from 'react-router-dom';
import { allProducts } from 'utils/data';
import { formatPrice } from 'utils/functions';

import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ImageWrapper = styled(Paper)({
  width: '50%',
});

const ItemImage = styled(Image)({
  width: '100%',
});

const ProductPrice = styled(Typography)({
  color: 'red',
  fontSize: 30,
  fontWeight: 500,
  marginTop: '1rem',
});

const ProductDetail: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const product = allProducts.find((item) => item.id === Number(id));

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

  const breadcrumbs = [
    <Link key="1" to="/">
      Home
    </Link>,
    <Typography key="2" color="text.primary">
      {product?.name}
    </Typography>,
  ];

  return (
    <>
      <HelmetMeta title="Detail" />
      <Breadcrumbs
        sx={{ mt: 3, mb: 3 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box sx={{ display: 'flex' }}>
        <ImageWrapper variant="outlined">
          <ItemImage src={product?.imageUrl} alt="Product image" />
        </ImageWrapper>
        <Box
          sx={{
            ml: 5,
            width: '30%',
          }}
        >
          <Typography variant="h4">{product?.name}</Typography>
          <Rating name="read-only" value={4} readOnly sx={{ mt: 2, mb: 2 }} />
          <Typography variant="subtitle1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </Typography>
          <ProductPrice>{formatPrice(product?.price)}</ProductPrice>
          <Button
            variant="contained"
            color="error"
            sx={{ width: '100%', paddingY: 1, mt: 3 }}
            endIcon={<AddShoppingCartIcon />}
            onClick={() => {
              if (product) dispatch(addToCart(product));
              handleClick();
            }}
          >
            Add to Cart
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
              Add to cart successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Overview
        </Typography>
        <Typography variant="subtitle1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been
          the industry standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s,
        </Typography>
      </Box>
    </>
  );
};

export default ProductDetail;
