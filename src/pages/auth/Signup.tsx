import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Link,
  Paper,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { signupThunk } from 'app/store/features/auth/authThunks';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { NewUser } from 'modals/User';
// import { PASSWORD_REGEX } from 'constants/regex';

const Signup: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const signup = useAppSelector((state) => state.auth.signup);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('auth.invalid-email'))
      .required(t('auth.required')),
    password: yup
      .string()
      // .matches(PASSWORD_REGEX, t('auth.invalid-password'))
      .required(t('auth.required')),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NewUser>({ resolver: yupResolver(schema) });

  const formSubmitHandler: SubmitHandler<NewUser> = (data: NewUser) => {
    dispatch(signupThunk(data));
  };

  return (
    <>
      <HelmetMeta title="Signup" />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 5,
            boxShadow: '0px 10px 20px 5px rgba(0,0,0,0.1)',
            borderRadius: 4,
            minWidth: '25%',
            width: 600,
          }}
        >
          <Typography
            variant="h4"
            margin={2}
            textAlign="center"
            color="primary"
          >
            TECHSHOP
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            margin={2}
            fontWeight="bold"
          >
            Create Account
          </Typography>
          {signup.error && (
            <Alert severity="error">That email is taken. Try another!</Alert>
          )}
          {signup.result && !signup.error && (
            <Alert severity="success">Account successfully created!</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit(formSubmitHandler)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  autoFocus
                  error={!!errors.address}
                  helperText={errors.address ? errors.address.message : ''}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="Phone number"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ''}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              )}
            />
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ mt: 4, width: '40%', height: 40 }}
                disabled={signup.loading}
              >
                {signup.loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  t('btn.submit')
                )}
              </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center" mt={4}>
              <Typography paddingX={0.75}>Has an account?</Typography>
              <Link component={RouterLink} underline="none" to="/auth/login">
                Login here
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Signup;
