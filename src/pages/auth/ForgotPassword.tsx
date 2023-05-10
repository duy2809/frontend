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
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postMailThunk } from 'app/store/features/auth/authThunks';

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
            justifyContent: 'center',
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
            <Box display="flex" sx={{ justifyContent: 'center' }}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                sx={{ mt: 4, width: '40%', height: 40 }}
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
        </Paper>
      </Box>
    </>
  );
};

export default ForgotPassword;
