import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  InputBase,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { logout } from 'app/store/features/auth/authSlice';
import logo from 'assets/images/logo.png';
import Image from 'components/common/Image';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const links = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    path: '/profile',
    label: 'Profile',
  },
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Image
              src={logo}
              alt="logo"
              sx={{
                width: '148px',
                ml: '10px'
              }}
            />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1, px: 4, display: 'flex' }}>
            {/* {links.map((link) => (
              <Typography key={link.path} sx={{ px: 1 }}>
                <Link to={link.path}>{link.label}</Link>
              </Typography>
            ))} */}
          </Box>
          {user.data ? (
            <Button color="inherit" variant="text" onClick={onLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/auth/login">
              <Button
                color="inherit"
                variant="text"
                startIcon={<AccountCircle />}
              >
                Login
              </Button>
            </Link>
          )}
          <IconButton size="large" edge="end" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
