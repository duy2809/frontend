import { FC } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import Image from 'components/common/Image';
import { styled } from '@mui/material/styles';
import { formatPrice } from 'utils/functions';
import { Link } from 'react-router-dom';
import { Product } from 'modals/Product';

type ListProps = {
  list: Product[];
};

const ProductListWrapper = styled(Box)({
  marginTop: '2rem',
  marginBottom: '2rem',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const ItemWrapper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  width: 275,
  height: 260,
  margin: 11,
  '&:hover': {
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  },
});

const ImageWrapper = styled(Box)({
  width: 180,
  height: 150,
});

const ItemImage = styled(Image)({
  width: '100%',
});

const ProductText = styled(Typography)({
  fontSize: 19,
  fontWeight: 500,
});

const ProductName = styled(ProductText)({
  width: '85%',
});

const ProductPrice = styled(ProductText)({
  color: 'red',
});

const ProductList: FC<ListProps> = ({ list }) => (
  <ProductListWrapper>
    {list.map((item) => {
      const { images, name, price, id } = item;
      return (
        <Link to={`/detail/${id}`} key={id}>
          <ItemWrapper variant="outlined">
            <ImageWrapper>
              <ItemImage src={images[0]} />
            </ImageWrapper>
            <ProductName noWrap align="center">
              {name}
            </ProductName>
            <ProductPrice>{formatPrice(price)}</ProductPrice>
          </ItemWrapper>
        </Link>
      );
    })}
  </ProductListWrapper>
);

export default ProductList;
