/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */

import {
  Typography,
  Box,
  Breadcrumbs,
  Pagination,
  Paper,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HelmetMeta from 'components/common/HelmetMeta';
import { styled } from '@mui/material/styles';

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
  const brand = searchParams.get('brand') || undefined;
  const [orderBy, setOrderBy] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sort, setSort] = useState('');
  const page = searchParams.get('page') || undefined;

  const handleChangeSort = (event: any) => {
    const { value } = event.target;
    const [sortValue, orderValue] = value.split('.');
    setOrderBy(orderValue);
    setSortBy(sortValue);
    setSort(event.target.value);
  };

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
    dispatch(
      getProductsByCategoryThunk({
        id: categoryId,
        brand,
        orderBy,
        sortBy,
        page,
      }),
    );
    dispatch(getBrandsByCategoryThunk(categoryId));
  }, [dispatch, categoryId, brand, orderBy, sortBy, page]);

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
          {brands.map((brandItem) => (
            <Link to={`?brand=${brandItem.name}`} key={brandItem.id}>
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
                  src={brandItem.image.url}
                  sx={{ height: 40, maxWidth: 100 }}
                />
              </Paper>
            </Link>
          ))}
        </Box>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel id="sort">Sort</InputLabel>
          <Select
            labelId="sort"
            id="sort"
            value={sort}
            label="sort"
            onChange={handleChangeSort}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="name.ASC">A-Z</MenuItem>
            <MenuItem value="name.DESC">Z-A</MenuItem>
            <MenuItem value="price.ASC">Lowest Price</MenuItem>
            <MenuItem value="price.DESC">Highest Price</MenuItem>
          </Select>
        </FormControl>
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
