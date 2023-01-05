// Demo component

import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Laptop,
  DesktopWindows,
  SportsEsports,
  Mouse,
  Build,
  Keyboard,
  SdStorage,
  Sensors,
} from '@mui/icons-material';

import Image from 'components/common/Image';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'assets/styles/home/styles.css';

import {
  laptopListData,
  desktopListData,
  consoleListData,
  mouseListData,
  keyboardListData,
  storageListData,
  networkDeviceListData,
} from 'utils/data';
import ProductList from 'components/ProductList';
import bannerList from 'assets/images/home/index';

const menus = [
  {
    id: 1,
    path: '/office-laptops',
    label: 'Office Laptops',
    icon: <Laptop />,
  },
  {
    id: 2,
    path: '/gaming-laptops',
    label: 'Gaming Laptops',
    icon: <Laptop />,
  },
  {
    id: 3,
    path: '/gaming-desktops',
    label: 'Gaming Desktops',
    icon: <DesktopWindows />,
  },
  {
    id: 4,
    path: '/office-desktops',
    label: 'Office Desktops',
    icon: <DesktopWindows />,
  },
  {
    id: 5,
    path: '/gaming-consoles',
    label: 'Gaming Consoles',
    icon: <SportsEsports />,
  },
  {
    id: 6,
    path: '/mouses',
    label: 'Mouses',
    icon: <Mouse />,
  },
  {
    id: 7,
    path: '/keyboards',
    label: 'Keyboards',
    icon: <Keyboard />,
  },
  {
    id: 8,
    path: '/storages',
    label: 'Storage',
    icon: <SdStorage />,
  },
  {
    id: 9,
    path: '/networking',
    label: 'Networking',
    icon: <Sensors />,
  },
  {
    id: 10,
    path: '/build-pc',
    label: 'Build your PC',
    icon: <Build />,
  },
];

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HelmetMeta title={t('home.title')} />
      <Box sx={{ mt: 3, mb: 3, display: 'flex' }}>
        <Box sx={{ width: '15%', bgcolor: 'background.paper' }}>
          <List>
            {menus.map((menu) => {
              const { path, label, icon } = menu;
              return (
                <ListItem component={Link} to={path} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Swiper pagination modules={[Pagination]} className="mySwiper">
          {bannerList?.map((banner) => (
            <SwiperSlide>
              <Image src={banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Divider>
        <Typography variant="h5">LAPTOP</Typography>
      </Divider>
      <ProductList list={laptopListData} />
      <Divider>
        <Typography variant="h5">DESKTOPS</Typography>
      </Divider>
      <ProductList list={desktopListData} />
      <Divider>
        <Typography variant="h5">CONSOLES</Typography>
      </Divider>
      <ProductList list={consoleListData} />
      <Divider>
        <Typography variant="h5">MOUSES</Typography>
      </Divider>
      <ProductList list={mouseListData} />
      <Divider>
        <Typography variant="h5">KEYBOARD</Typography>
      </Divider>
      <ProductList list={keyboardListData} />
      <Divider>
        <Typography variant="h5">STORAGE</Typography>
      </Divider>
      <ProductList list={storageListData} />
      <Divider>
        <Typography variant="h5">NETWORK DEVICES</Typography>
      </Divider>
      <ProductList list={networkDeviceListData} />
    </>
  );
};

export default Home;
