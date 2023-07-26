// Demo component

import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListIcon from '@mui/icons-material/List';
import BookIcon from '@mui/icons-material/Book';
import StarIcon from '@mui/icons-material/Star';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

const drawerWidth = 260;

const listMenu = [
  {
    id: 1,
    path: 'users',
    label: 'Users',
    icon: <PeopleIcon />,
  },
  {
    id: 2,
    path: 'products',
    label: 'Products',
    icon: <InventoryIcon />,
  },
  {
    id: 3,
    path: 'orders',
    label: 'Orders',
    icon: <ListIcon />,
  },
  {
    id: 4,
    path: 'categories',
    label: 'Categories',
    icon: <BookIcon />,
  },
  {
    id: 4,
    path: 'brands',
    label: 'Brands',
    icon: <StarIcon />,
  },
];

const dataMenu = [
  {
    id: 1,
    path: 'crawl',
    label: 'Crawl',
    icon: <PrecisionManufacturingIcon />,
  },
];

const PrivateLayout: FC = () => (
  <Box display="flex">
    <Navbar admin />
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListSubheader>OVERVIEW</ListSubheader>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="dashboard"
              sx={{ '&.active': { background: '#ebf4fc' } }}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListSubheader>LIST</ListSubheader>
          {listMenu.map((menu) => {
            const { path, label, icon, id } = menu;
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={path}
                  sx={{ '&.active': { background: '#ebf4fc' } }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <List>
          <ListSubheader>DATA</ListSubheader>
          {dataMenu.map((menu) => {
            const { path, label, icon, id } = menu;
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={path}
                  sx={{ '&.active': { background: '#ebf4fc' } }}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
    <Outlet />
  </Box>
);

export default PrivateLayout;
