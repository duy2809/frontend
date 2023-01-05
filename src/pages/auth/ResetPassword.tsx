import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
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
import background from 'assets/images/background.jpg';
import Image from 'components/common/Image';

interface ResetPasswordForm {
  password: string;
  confirm_password: string;
}

const ResetPassword: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const resetPassword = useAppSelector((state) => state.auth.resetPassword);
  const [searchParams, setSearchParams] = useSearchParams();
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
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: '50%', height: '93vh' }}>
          <Image
            src={background}
            sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '45%',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              mb: 4,
            }}
          >
            Reset password
          </Typography>
          {resetPassword.error && (
            <Alert severity="error">Reset password failed!</Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmitHandler)}
            sx={{ mt: 1, width: '50%' }}
          >
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
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 4 }}
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
      </Box>
    </>
  );
};

export default ResetPassword;
