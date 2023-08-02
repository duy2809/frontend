// Demo component

import { Toolbar, Typography, Box } from '@mui/material';
import { useAppSelector } from 'app/hooks/redux';
import HelmetMeta from 'components/common/HelmetMeta';
import { User } from 'modals/User';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile: FC = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user.data) as User;

  return (
    <>
      <HelmetMeta title={t('profile.title')} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Profile information
        </Typography>
        <Box display="flex" alignItems="center">
          <AccountCircleIcon sx={{ fontSize: 100, mr: 5 }} />
          <Box>
            <Typography variant="h5" mb={1}>
              Name: {user.name}
            </Typography>
            <Typography variant="h5" mb={1}>
              Email: {user.email}
            </Typography>
            <Typography variant="h5" mb={1}>
              Address: {user.address}
            </Typography>
            <Typography variant="h5" mb={1}>
              Phone: {user.phone}
            </Typography>
            <Typography variant="h5" mb={1}>
              Role: {user.role.toLocaleLowerCase()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
