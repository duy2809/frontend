import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Link,
  Paper,
  styled,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { loginThunk } from 'app/store/features/auth/authThunks';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// import { PASSWORD_REGEX } from 'constants/regex';

interface FormValue {
  email: string;
  password: string;
}

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const Login: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const login = useAppSelector((state) => state.auth.login);

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
  } = useForm<FormValue>({ resolver: yupResolver(schema) });

  const formSubmitHandler: SubmitHandler<FormValue> = (data: FormValue) =>
    dispatch(loginThunk(data));

  return (
    <>
      <HelmetMeta title={t('login.title')} />
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
          }}
        >
          <Typography variant="h4" margin={2} textAlign="center">
            <StyledLink to="/">TECHSHOP</StyledLink>
          </Typography>
          <Typography
            variant="h5"
            textAlign="center"
            margin={2}
            fontWeight="bold"
          >
            {t('login.title')}
          </Typography>
          {login.error && (
            <Alert severity="error">{t('auth.passwords-not-match')}</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit(formSubmitHandler)}>
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
                disabled={login.loading}
              >
                {login.loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  t('btn.submit')
                )}
              </Button>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center" mt={4}>
              <Link
                component={RouterLink}
                to="/auth/forgot-password"
                underline="none"
              >
                Forgot password?
              </Link>
              <Typography paddingX={0.75}>or</Typography>
              <Link component={RouterLink} underline="none" to="/auth/signup">
                Sign up here
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
