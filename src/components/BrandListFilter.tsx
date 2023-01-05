import { FC } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import Image from 'components/common/Image';
import { styled } from '@mui/material/styles';

type Item = {
  id: number;
  imageUrl: string;
  name: string;
  price: string;
};

type ListProps = {
  list: Item[];
};

const ProductListWrapper = styled(Box)({
  marginTop: '2rem',
  marginBottom: '2rem',
  display: 'flex',
  flexWrap: 'wrap',
});

const ItemWrapper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
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
  marginTop: 20,
});

const ProductText = styled(Typography)({
  fontSize: 19,
  fontWeight: 500,
});

const ProductName = styled(ProductText)({
  marginTop: 20,
  width: '85%',
});

const ProductPrice = styled(ProductText)({
  color: 'red',
});

const ProductList: FC<ListProps> = ({ list }) => (
  <ProductListWrapper>
    {list.map((item) => {
      const { imageUrl, name, price } = item;
      return (
        <ItemWrapper variant="outlined">
          <ImageWrapper>
            <ItemImage src={imageUrl} />
          </ImageWrapper>
          <ProductName noWrap align="center">
            {name}
          </ProductName>
          <ProductPrice>{price}</ProductPrice>
        </ItemWrapper>
      );
    })}
  </ProductListWrapper>
);

export default ProductList;
