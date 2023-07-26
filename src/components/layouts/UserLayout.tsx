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
import PeopleIcon from '@mui/icons-material/People';
import ListIcon from '@mui/icons-material/List';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

const drawerWidth = 260;

const listMenu = [
  {
    id: 1,
    path: 'orders',
    label: 'Orders',
    icon: <ListIcon />,
  },
  {
    id: 2,
    path: 'profile',
    label: 'Profile',
    icon: <PeopleIcon />,
  },
];

const UserLayout: FC = () => (
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
      </Box>
    </Drawer>
    <Outlet />
  </Box>
);

export default UserLayout;
