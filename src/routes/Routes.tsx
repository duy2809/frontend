import { RoleCode } from 'constants/roles';
import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const routes: RouteObject[] = [
  // Public routes
  {
    path: '',
    element: (
      <PublicRoute
        component={() => import('components/layouts/PublicLayout')}
      />
    ),
    children: [
      {
        path: '',
        element: <PublicRoute component={() => import('pages/Home')} />,
      },
      {
        path: 'office-laptops',
        element: <PublicRoute component={() => import('pages/OfficeLaptop')} />,
      },
      {
        path: 'gaming-laptops',
        element: <PublicRoute component={() => import('pages/GamingLaptop')} />,
      },
      {
        path: 'office-desktops',
        element: (
          <PublicRoute component={() => import('pages/OfficeDesktop')} />
        ),
      },
      {
        path: 'gaming-desktops',
        element: (
          <PublicRoute component={() => import('pages/GamingDesktop')} />
        ),
      },
      {
        path: 'gaming-consoles',
        element: (
          <PublicRoute component={() => import('pages/GamingConsole')} />
        ),
      },
      {
        path: 'mouses',
        element: <PublicRoute component={() => import('pages/Mouse')} />,
      },
      {
        path: 'keyboards',
        element: <PublicRoute component={() => import('pages/Keyboard')} />,
      },
      {
        path: 'storages',
        element: <PublicRoute component={() => import('pages/Storage')} />,
      },
      {
        path: 'networking',
        element: <PublicRoute component={() => import('pages/Networking')} />,
      },
      {
        path: 'detail/:id',
        element: (
          <PublicRoute component={() => import('pages/ProductDetail')} />
        ),
      },
      {
        path: 'search',
        element: <PublicRoute component={() => import('pages/Search')} />,
      },
      {
        path: 'cart',
        element: <PublicRoute component={() => import('pages/Cart')} />,
      },
      {
        path: 'build-pc',
        element: <PublicRoute component={() => import('pages/BuildPC')} />,
      },
      {
        path: 'payment',
        element: (
          <PublicRoute component={() => import('pages/PaymentResult')} />
        ),
      },
      {
        path: '*',
        element: <PublicRoute component={() => import('pages/Page404')} />,
      },
    ],
  },

  // Auth routes
  {
    path: 'auth',
    element: (
      <AuthRoute component={() => import('components/layouts/AuthLayout')} />
    ),
    children: [
      {
        path: 'login',
        element: <AuthRoute component={() => import('pages/auth/Login')} />,
      },
      {
        path: 'signup',
        element: <AuthRoute component={() => import('pages/auth/Signup')} />,
      },
      {
        path: 'forgot-password',
        element: (
          <AuthRoute component={() => import('pages/auth/ForgotPassword')} />
        ),
      },
      {
        path: 'reset-password',
        element: (
          <AuthRoute component={() => import('pages/auth/ResetPassword')} />
        ),
      },
    ],
  },

  // Private routes
  {
    path: 'admin',
    element: (
      <PrivateRoute
        component={() => import('components/layouts/PrivateLayout')}
        permissions={[RoleCode.ADMIN]}
      />
    ),
    children: [
      {
        path: 'dashboard',
        element: (
          <PrivateRoute component={() => import('pages/admin/Dashboard')} />
        ),
      },
      {
        path: 'users',
        element: <PrivateRoute component={() => import('pages/admin/User')} />,
      },
      {
        path: 'products',
        element: (
          <PrivateRoute component={() => import('pages/admin/Product')} />
        ),
      },
      {
        path: 'orders',
        element: <PrivateRoute component={() => import('pages/admin/Order')} />,
      },
      {
        path: 'categories',
        element: (
          <PrivateRoute component={() => import('pages/admin/Category')} />
        ),
      },
      {
        path: 'crawl',
        element: <PrivateRoute component={() => import('pages/admin/Crawl')} />,
      },
      {
        path: 'profile',
        element: <PrivateRoute component={() => import('pages/Profile')} />,
      },
      {
        path: '403',
        element: <PrivateRoute component={() => import('pages/Page403')} />,
      },
    ],
  },
];

const Router: FC = () => {
  const element = useRoutes(routes);

  return <>{element}</>;
};

export default Router;
