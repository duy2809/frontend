import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  InputBase,
  Badge,
  IconButton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { logout } from 'app/store/features/auth/authSlice';
import logo from 'assets/images/logo.png';
import Image from 'components/common/Image';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoleCode } from 'constants/roles';

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

type ListProps = {
  admin: boolean;
};

const Navbar: FC<ListProps> = ({ admin }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart.cart);
  const [value, setValue] = useState('');

  const onLogout = () => {
    dispatch(logout());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value) {
      navigate({
        pathname: '/search',
        search: `?q=${value}`,
      });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth={admin ? false : 'xl'}>
        <Toolbar>
          <Link to="/">
            <Box
              sx={{
                display: 'flex',
                width: '150px',
                height: '22px',
                mr: '50px',
              }}
            >
              <Image src={logo} alt="logo" sx={{ width: '100%' }} />
            </Box>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              defaultValue={value}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
          </Search>
          <Box sx={{ flexGrow: 1, px: 4, display: 'flex' }} />
          {user.data ? (
            <Box display='flex' alignItems='center'>
              {user.data.role === RoleCode.ADMIN && (
                <Link to="/admin/dashboard">
                  <Button
                    color="secondary"
                    variant="text"
                    startIcon={<DashboardIcon />}
                    sx={{ mr: 3 }}
                  >
                    Admin page
                  </Button>
                </Link>
              )}
              {user.data.name && (
                <Button
                  color="inherit"
                  variant="text"
                  startIcon={<AccountCircle />}
                  sx={{ display: 'flex', alignItems: 'center', mr: 3 }}
                >
                  Welcome, {user.data.name}
                </Button>
              )}
              <Button
                color="inherit"
                variant="text"
                onClick={onLogout}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Link to="/auth/login">
              <Button
                color="secondary"
                variant="text"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </Link>
          )}
          <Link to="/cart">
            <IconButton size="large" edge="end" color="secondary">
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
