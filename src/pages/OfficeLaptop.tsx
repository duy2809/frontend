// Demo component

import { Typography, Box, Breadcrumbs, Pagination, Paper } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { FC } from 'react';
import { Link } from 'react-router-dom';
import HelmetMeta from 'components/common/HelmetMeta';
import { styled } from '@mui/material/styles';

import FilterSelect from 'components/FilterSelect';
import ProductList from 'components/ProductList';
import { laptopBrandData } from 'utils/data';
import { officeLaptopData } from 'utils/data';
import Image from 'components/common/Image';

const breadcrumbs = [
  <Link key="1" to="/">
    Home
  </Link>,
  <Typography key="2" color="text.primary">
    Office Laptop
  </Typography>,
];

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

const OfficeLaptop: FC = () => (
  <>
    <HelmetMeta title="Office Laptop" />
    <Breadcrumbs
      sx={{ mt: 3, mb: 3 }}
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
    <Typography variant="h4">OFFICE LAPTOP</Typography>
    <FilterWrapper>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          cursor: 'pointer',
        }}
      >
        {laptopBrandData.map((brand) => (
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
              <Image src={brand.imageUrl} sx={{ height: 40, maxWidth: 100 }} />
            </Paper>
          </Link>
        ))}
      </Box>
      <FilterSelect />
    </FilterWrapper>
    <ProductList list={officeLaptopData} />
    <PaginationWrapper>
      <Pagination count={10} color="primary" />
    </PaginationWrapper>
  </>
);

export default OfficeLaptop;
