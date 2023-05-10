import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import { postResetPasswordThunk } from 'app/store/features/auth/authThunks';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSearchParams } from 'react-router-dom';
// import { PASSWORD_REGEX } from 'constants/regex';

interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

const ResetPassword: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const resetPassword = useAppSelector((state) => state.auth.resetPassword);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const schema = yup.object().shape({
    password: yup.string().required(t('auth.required')),
    confirm_password: yup
      .string()
      // .matches(PASSWORD_REGEX, t('auth.invalid-password'))
      .required(t('auth.required'))
      .oneOf([yup.ref('password'), null], 'Password must match'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordForm>({ resolver: yupResolver(schema) });

  const formSubmitHandler: SubmitHandler<ResetPasswordForm> = (
    data: ResetPasswordForm,
  ) =>
    dispatch(
      postResetPasswordThunk({
        token,
        new_password: data.password,
      }),
    );

  return (
    <>
      <HelmetMeta title="Reset password" />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            Reset password
          </Typography>
          {resetPassword.error && (
            <Alert severity="error">Reset password failed!</Alert>
          )}
          <Box component="form" onSubmit={handleSubmit(formSubmitHandler)}>
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
            <Controller
              name="confirm_password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm password"
                  type="password"
                  id="confirm_password"
                  autoComplete="current-password"
                  error={!!errors.confirm_password}
                  helperText={
                    errors.confirm_password
                      ? errors.confirm_password.message
                      : ''
                  }
                />
              )}
            />
            <Box display="flex" sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ mt: 4, width: '30%', height: 40 }}
                disabled={resetPassword.loading}
              >
                {resetPassword.loading ? (
                  <CircularProgress color="inherit" size={24} />
                ) : (
                  t('btn.submit')
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default ResetPassword;
