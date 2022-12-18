// Demo component

import { Typography, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material';
import LaptopIcon from '@mui/icons-material/Laptop'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MouseIcon from '@mui/icons-material/Mouse';
import SensorsIcon from '@mui/icons-material/Sensors';
import BuildIcon from '@mui/icons-material/Build';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SdStorageIcon from '@mui/icons-material/SdStorage';

import Image from 'components/common/Image';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'assets/styles/home/styles.css';

import asrock_banner from 'assets/images/home/asrock.jpg';
import asus_banner from 'assets/images/home/asus.jpg';
import gigabyte_banner from 'assets/images/home/gigabyte.jpg';
import msi_banner from 'assets/images/home/msi.jpg';
import samsung_banner from 'assets/images/home/samsung.jpg';

const laptopListData = [
  {
    id: 1,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/34-236-330-01.jpg',
    name: 'ASUS VivoBook S 14X Laptop',
    price: '17.990.000 VNĐ',
  },
  {
    id: 2,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/AHRCD2209191A45E488.jpg',
    name: 'Lenovo ThinkPad X1 Carbon',
    price: '51.990.000 VNĐ',
  },
  {
    id: 3,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/A0ZXD2112200Y62UD91.jpg',
    name: 'HP Laptop Pavilion',
    price: '9.990.000 VNĐ',
  },
  {
    id: 4,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/34-725-208-02.jpg',
    name: 'Aorus - 17.3" 360 Hz IPS',
    price: '51.990.000 VNĐ',
  },
  {
    id: 5,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/34-233-529-06.jpg',
    name: 'GIGABYTE AERO 16 XE5',
    price: '32.990.000 VNĐ',
  },
  {
    id: 6,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/34-156-339-V26.jpg',
    name: 'MSI GE Series - 17.3"',
    price: '64.990.000 VNĐ',
  },
  {
    id: 7,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/34-360-175-V01.jpg',
    name: 'Acer Laptop Aspire 5',
    price: '10.990.000 VNĐ',
  },
  {
    id: 8,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/A24GD2105315L5GF.jpg',
    name: 'Dell Latitude 3000 3420',
    price: '14.990.000 VNĐ',
  },
];

const desktopListData = [
  {
    id: 1,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/AA0SD220426138KVQ96.jpg',
    name: 'Dell Vostro 3888 Desktop',
    price: '16.990.000 VNĐ',
  },
  {
    id: 2,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/83-289-215-V01.jpg',
    name: 'Skytech PRISM II Gaming Desktop',
    price: '64.990.000 VNĐ',
  },
  {
    id: 3,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/83-101-859-V08.jpg',
    name: 'Acer Gaming Desktop Predator',
    price: '60.990.000 VNĐ',
  },
  {
    id: 4,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/AA0SD22060916CX03B7.jpg',
    name: 'Dell OptiPlex 3090 Desktop',
    price: '15.990.000 VNĐ',
  },
  {
    id: 5,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/83-289-215-V01.jpg',
    name: 'Skytech PRISM II Gaming Desktop',
    price: '64.990.000 VNĐ',
  },
  {
    id: 6,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/AA0SD220426138KVQ96.jpg',
    name: 'Dell Vostro 3888 Desktop',
    price: '16.990.000 VNĐ',
  },
  {
    id: 7,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/AA0SD22060916CX03B7.jpg',
    name: 'Dell OptiPlex 3090 Desktop',
    price: '15.990.000 VNĐ',
  },
  {
    id: 8,
    imageUrl:
      'https://c1.neweggimages.com/ProductImageCompressAll1280/83-101-859-V08.jpg',
    name: 'Acer Gaming Desktop Predator',
    price: '60.990.000 VNĐ',
  },
];

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <HelmetMeta title={t('home.title')} />
      <Box sx={{ mt: 3, mb: 3, display: 'flex' }}>
        <Box sx={{ width: '15%', bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LaptopIcon />
                  </ListItemIcon>
                  <ListItemText primary="Office Laptops" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <LaptopIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gaming Laptops" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DesktopWindowsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gaming Desktops" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DesktopWindowsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Office Desktops" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SportsEsportsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gaming Consoles" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MouseIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mouses" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <KeyboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Keyboards" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SdStorageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Storage" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SensorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Networking" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary="Build your PC" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
        <Swiper pagination modules={[Pagination]} className="mySwiper">
          <SwiperSlide>
            <Image src={msi_banner} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={asus_banner} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={gigabyte_banner} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={samsung_banner} />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={asrock_banner} />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Divider>
        <Typography variant="h5">LAPTOP</Typography>
      </Divider>
      <Box
        sx={{
          mt: 3,
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1.25,
            width: 350,
            height: 300,
          },
        }}
      >
        {laptopListData.map((laptop) => (
          <Paper variant="outlined" sx={{ cursor: 'pointer' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: 250, height: 200 }}>
                <Image src={laptop.imageUrl} sx={{ width: '100%' }} />
              </Box>
              <Typography variant="h6">{laptop.name}</Typography>
              <Typography variant="h6" sx={{ color: 'red' }}>
                {laptop.price}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
      <Divider>
        <Typography variant="h5">DESKTOPS</Typography>
      </Divider>
      <Box
        sx={{
          mt: 5,
          mb: 5,
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1.25,
            width: 350,
            height: 300,
          },
        }}
      >
        {desktopListData.map((laptop) => (
          <Paper variant="outlined" sx={{ cursor: 'pointer' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: 250, height: 200 }}>
                <Image src={laptop.imageUrl} sx={{ width: '100%' }} />
              </Box>
              <Typography variant="h6">{laptop.name}</Typography>
              <Typography variant="h6" sx={{ color: 'red' }}>
                {laptop.price}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default Home;
