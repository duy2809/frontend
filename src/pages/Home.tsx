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
  LaptopMacOutlined,
  LaptopWindows,
  HomeWorkOutlined,
  SportsEsportsOutlined,
  MouseOutlined,
  GamepadOutlined,
  KeyboardOutlined,
  SdStorageOutlined,
  Sensors,
} from '@mui/icons-material';

import Image from 'components/common/Image';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'assets/styles/home/styles.css';

import ProductList from 'components/ProductList';
import { bannerImages } from 'utils/data';
import {
  caseData,
  consoleData,
  cpucoolerData,
  cpuData,
  gamingDesktopData,
  gamingLaptopData,
  keyboardData,
  memoryData,
  monitorData,
  motherboardData,
  mouseData,
  networkingData,
  officeDesktopData,
  officeLaptopData,
  osData,
  powersupplyData,
  storageData,
  videocardData,
} from 'utils/data';

const menus = [
  {
    id: 1,
    path: '/office-laptops',
    label: 'Office Laptops',
    icon: <LaptopMacOutlined />,
  },
  {
    id: 2,
    path: '/office-desktops',
    label: 'Office Desktops',
    icon: <HomeWorkOutlined />,
  },
  {
    id: 3,
    path: '/gaming-laptops',
    label: 'Gaming Laptops',
    icon: <LaptopWindows />,
  },
  {
    id: 4,
    path: '/gaming-desktops',
    label: 'Gaming Desktops',
    icon: <GamepadOutlined />,
  },
  {
    id: 5,
    path: '/gaming-consoles',
    label: 'Gaming Consoles',
    icon: <SportsEsportsOutlined />,
  },
  {
    id: 6,
    path: '/mouses',
    label: 'Mouses',
    icon: <MouseOutlined />,
  },
  {
    id: 7,
    path: '/keyboards',
    label: 'Keyboards',
    icon: <KeyboardOutlined />,
  },
  {
    id: 8,
    path: '/storages',
    label: 'Storage',
    icon: <SdStorageOutlined />,
  },
  {
    id: 9,
    path: '/networking',
    label: 'Networking',
    icon: <Sensors />,
  },
];

const productCategories = [
  { title: 'OFFICE LAPTOP', data: officeLaptopData },
  { title: 'GAMING LAPTOP', data: gamingLaptopData },
  { title: 'OFFICE DESKTOPS', data: officeDesktopData },
  { title: 'GAMING DESKTOPS', data: gamingDesktopData },
  { title: 'CPU', data: cpuData },
  { title: 'MOTHERBOARD', data: motherboardData },
  { title: 'MEMORY', data: memoryData },
  { title: 'VIDEO CARDS', data: videocardData },
  { title: 'CPU COOLER', data: cpucoolerData },
  { title: 'CASE', data: caseData },
  { title: 'POWER SUPPLY', data: powersupplyData },
  { title: 'OPERATING SYSTEM', data: osData },
  { title: 'MONITORS', data: monitorData },
  { title: 'CONSOLES', data: consoleData },
  { title: 'MOUSES', data: mouseData },
  { title: 'KEYBOARD', data: keyboardData },
  { title: 'STORAGE', data: storageData },
  { title: 'NETWORK DEVICES', data: networkingData },
];

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HelmetMeta title={t('home.title')} />
      <Box display="flex" my={3}>
        <Box sx={{ minWidth: 225, bgcolor: 'background.paper' }}>
          <List>
            {menus.map((menu) => {
              const { path, label, icon, id } = menu;
              return (
                <ListItem key={id} component={Link} to={path} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Swiper
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
        >
          {bannerImages?.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Image src={banner.url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      {productCategories.map((category) => (
        <div key={category.title}>
          <Divider>
            <Typography variant="h5">{category.title}</Typography>
          </Divider>
          <ProductList list={category.data} />
        </div>
      ))}
    </>
  );
};

export default Home;
