import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postMailThunk } from 'app/store/features/auth/authThunks';
import background from 'assets/images/background.jpg';
import Image from 'components/common/Image';

interface FormValue {
  email: string;
}

const ForgotPassword: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sendMail = useAppSelector((state) => state.auth.sendMail);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t('auth.invalid-email'))
      .required(t('auth.required')),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValue>({ resolver: yupResolver(schema) });

  const formSubmitHandler: SubmitHandler<FormValue> = (data: FormValue) =>
    dispatch(postMailThunk(data));

  return (
    <>
      <HelmetMeta title={t('forgot-password.title')} />
      <Box display="flex">
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
            {t('forgot-password.title')}
          </Typography>
          {sendMail.error && (
            <Alert severity="error">
              {t('forgot-password.email-not-exist')}
            </Alert>
          )}
          {sendMail.result && !sendMail.error && (
            <Alert severity="success">{t('forgot-password.email-sent')}</Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(formSubmitHandler)}
            sx={{ mt: 1, width: '50%' }}
          >
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
            <Button
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              sx={{ mt: 4 }}
              disabled={sendMail.loading}
            >
              {sendMail.loading ? (
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

export default ForgotPassword;
