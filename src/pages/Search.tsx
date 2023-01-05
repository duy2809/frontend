// Demo component

import { Typography, Box, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HelmetMeta from 'components/common/HelmetMeta';
import { styled } from '@mui/material/styles';

import FilterSelect from 'components/FilterSelect';
import ProductList from 'components/ProductList';
import { allProducts } from 'utils/data';

const breadcrumbs = [
  <Link key="1" to="/">
    Home
  </Link>,
  <Typography key="2" color="text.primary">
    Search
  </Typography>,
];

const FilterWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  marginTop: '2rem',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Search: FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const foundProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query?.toLowerCase() || ''),
  );

  return (
    <>
      <HelmetMeta title="Office Laptop" />
      <Breadcrumbs
        sx={{ mt: 3, mb: 3 }}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <FilterWrapper>
        <Typography variant="h4">
          Search results for &apos;{query}&apos;:
        </Typography>
        <FilterSelect />
      </FilterWrapper>
      <ProductList list={foundProducts} />
    </>
  );
};

export default Search;
