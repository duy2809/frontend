/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Demo component

import {
  Typography,
  Box,
  Breadcrumbs,
  Button,
  Rating,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  styled,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

import { FC, Suspense, useState } from 'react';
import * as React from 'react';
import { useEffect } from 'react';

import HelmetMeta from 'components/common/HelmetMeta';
import Image from 'components/common/Image';
import { Image as ImageType } from 'modals/Image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import {
  getReviewsByProductThunk,
  postReviewThunk,
} from 'app/store/features/review/reviewThunk';
import { addToCart } from 'app/store/features/cart/cartSlice';
import { Link, useParams } from 'react-router-dom';
import { deepClone, formatPrice, toTitleCase } from 'utils/functions';
import { getProductThunk } from 'app/store/features/product/productThunk';
import { resetProduct } from 'app/store/features/product/productSlice';
import { resetReviewsByProduct } from 'app/store/features/review/reviewSlice';
import Fallback from 'components/common/Fallback';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ImageWrapper = styled(Box)({
  width: '50%',
  height: '20%',
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ProductDetail: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [star, setStar] = useState(0);
  const [content, setContent] = useState('');
  const { id } = useParams();
  const product = useAppSelector((state) => state.product.product.data);
  const reviews = useAppSelector((state) => state.review.reviewsByProduct.data);
  const user = useAppSelector((state) => state.auth.user.data);

  useEffect(() => {
    dispatch(resetProduct());
    dispatch(resetReviewsByProduct());
    dispatch(getProductThunk(Number(id)));
    dispatch(getReviewsByProductThunk(Number(id)));
  }, [dispatch, id]);

  const handleStarChange = (
    event: React.SyntheticEvent,
    value: number | null,
  ) => {
    if (value) setStar(value);
  };

  const handleSendReview = async () => {
    if (star && content && user?.id && id) {
      const data = { star, content, product_id: Number(id), user_id: user.id };
      await dispatch(postReviewThunk(data));
      await dispatch(getReviewsByProductThunk(Number(id)));
      setStar(0);
      setContent('');
    }
  };

  const rows: JSX.Element[] = [];
  let specs: Record<string, unknown> = {};
  if (product) specs = deepClone(product.specs) as Record<string, unknown>;

  Object.keys(specs).forEach((category) => {
    const categoryObj = specs[category] as Record<string, string>;
    Object.keys(categoryObj).forEach((key) => {
      const value = categoryObj[key];
      rows.push(
        <StyledTableRow key={`${category}-${key}`}>
          <StyledTableCell>{toTitleCase(key)}</StyledTableCell>
          <StyledTableCell>{value}</StyledTableCell>
        </StyledTableRow>,
      );
    });
  });

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
    <Typography key="2" color="text.primary" noWrap width={300}>
      {product?.name}
    </Typography>,
  ];

  if (!product) return <Suspense fallback={<Fallback />} />;

  return (
    <>
      <HelmetMeta title={product?.name} />
      <Breadcrumbs
        sx={{ mt: 3, mb: 3 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box display="flex">
        <ImageWrapper>
          <Swiper
            navigation
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
          >
            {product?.images.map((image: ImageType) => (
              <SwiperSlide key={image.id}>
                <ItemImage src={image.url} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ImageWrapper>
        <Box
          sx={{
            ml: 5,
            width: '50%',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {product?.name}
          </Typography>
          <Rating name="read-only" value={4} readOnly sx={{ mt: 2, mb: 2 }} />
          <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
            {product?.descriptions.map((description) => (
              <ListItem
                sx={{ display: 'list-item' }}
                key={description}
                disablePadding
              >
                <ListItemText
                  primary={description}
                  primaryTypographyProps={{ fontSize: 16 }}
                />
              </ListItem>
            ))}
          </List>
          <ProductPrice>{formatPrice(product?.price)}</ProductPrice>
          <Button
            variant="contained"
            color="error"
            sx={{ width: '50%', paddingY: 1, mt: 3 }}
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
              vertical: 'top',
              horizontal: 'center',
            }}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%', marginTop: 7 }}
            >
              Add to cart successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Learn more about this product
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: '70%', marginBottom: 5 }}
        >
          <Table>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mb={5}>
        <Typography variant="h5" mb={3}>
          Reviews ({reviews?.length})
        </Typography>
        {reviews?.map((review) => (
          <Box display="flex" mb={3} key={review.id}>
            <AccountCircleIcon sx={{ fontSize: 50 }} />
            <Box ml={2}>
              <Typography variant="h6">{review.user.name}</Typography>
              <Rating name="read-only" value={review.star} readOnly />
              <Typography variant="body1" mt={1}>
                {review.content}
              </Typography>
            </Box>
          </Box>
        ))}
        {user && (
          <>
            <Box display="flex" mb={2}>
              <AccountCircleIcon sx={{ fontSize: 50 }} />
              <Box
                ml={2}
                display="flex"
                flexDirection="column"
                sx={{ width: '60%', mb: 3 }}
              >
                <Typography variant="h6">{user?.name}</Typography>
                <Rating
                  name="user-review"
                  sx={{ mb: 2 }}
                  value={star}
                  onChange={handleStarChange}
                />
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <TextField
                    id="outlined-multiline-static"
                    placeholder="Write your review here..."
                    multiline
                    fullWidth
                    rows={4}
                    sx={{ mr: 1 }}
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                  />
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSendReview}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default ProductDetail;
