// Demo component

import { Typography, Box, Breadcrumbs, Pagination, Paper } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HelmetMeta from 'components/common/HelmetMeta';
import { styled } from '@mui/material/styles';

import FilterSelect from 'components/FilterSelect';
import ProductList from 'components/ProductList';
import Image from 'components/common/Image';

import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { getProductsByCategoryThunk } from 'app/store/features/product/productThunk';
import { getBrandsByCategoryThunk } from 'app/store/features/brand/brandThunk';
import { resetProductsByCategory } from 'app/store/features/product/productSlice';
import { resetBrandsByCategory } from 'app/store/features/brand/brandSlice';

import { useSearchParams } from 'react-router-dom';

type ListProps = {
  categoryId: number;
  categoryName: string;
};

const FilterWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  marginTop: '2rem',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const PaginationWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  marginTop: '3rem',
  marginBottom: '3rem',
  justifyContent: 'center',
});

const CategoryProduct: FC<ListProps> = ({ categoryId, categoryName }) => {
  const [searchParams] = useSearchParams();
  const breadcrumbs = [
    <Link key="1" to="/">
      Home
    </Link>,
    <Typography key="2" color="text.primary">
      {categoryName}
    </Typography>,
  ];

  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state) => state.product.productsByCategory?.data,
  );
  const brands = useAppSelector((state) => state.brand.brandsByCategory?.data);

  useEffect(() => {
    dispatch(resetProductsByCategory());
    dispatch(resetBrandsByCategory());
    dispatch(getProductsByCategoryThunk(categoryId));
    dispatch(getBrandsByCategoryThunk(categoryId));
  }, [dispatch, categoryId]);

  return (
    <>
      <HelmetMeta title={categoryName} />
      <Breadcrumbs
        sx={{ mt: 3, mb: 3 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant="h4">{categoryName.toUpperCase()}</Typography>
      <FilterWrapper>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            cursor: 'pointer',
          }}
        >
          {brands.map((brand) => (
            <Link to={`?brand=${brand.name}`} key={brand.id}>
              <Paper
                variant="outlined"
                sx={{
                  paddingY: 1.5,
                  margin: 1,
                  width: 150,
                  display: 'flex',
                  justifyContent: 'center',
                  '&:hover': {
                    boxShadow:
                      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                  },
                }}
              >
                <Image
                  src={brand.image.url}
                  sx={{ height: 40, maxWidth: 100 }}
                />
              </Paper>
            </Link>
          ))}
        </Box>
        <FilterSelect />
      </FilterWrapper>
      <ProductList list={products} />
      {/* <PaginationWrapper>
        <Pagination count={10} color="primary" />
      </PaginationWrapper> */}
      <Box mb={10} />
    </>
  );
};

export default CategoryProduct;
