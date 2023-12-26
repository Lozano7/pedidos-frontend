'use client';
import { mainApi } from '@/api/mainApi';
import CustomTextField from '@/app/dashboard/components/forms/theme-elements/CustomTextField';
import { UserResponse } from '@/shared/interfaces/user.interface';
import { loginFailure, loginSuccess } from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data: response } = await mainApi.post<UserResponse>(
        '/auth/login',
        {
          email,
          password,
        }
      );
      if (response) {
        localStorage.setItem('x-token', response.access_token);
        localStorage.setItem('userRoles', JSON.stringify(response.roles));
        dispatch(loginSuccess(response));
        router.push('/dashboard/');
      }
    } catch (error: any) {
      setIsError(true);
      setError(error?.response?.data?.message || 'Error');
      dispatch(
        loginFailure(
          error?.response?.data?.message || 'Error al iniciar sesión'
        )
      );
      setLoading(false);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight='700' variant='h2' mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            component='label'
            htmlFor='correo'
            mb='5px'
          >
            Correo
          </Typography>
          <CustomTextField
            type='email'
            variant='outlined'
            fullWidth
            value={email}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setEmail(e.target.value);
            }}
          />
        </Box>
        <Box mt='25px'>
          <Typography
            variant='subtitle1'
            fontWeight={600}
            component='label'
            htmlFor='password'
            mb='5px'
          >
            Contraseña
          </Typography>
          <CustomTextField
            type='password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setPassword(e.target.value);
            }}
          />
        </Box>
      </Stack>
      <Box
        sx={{
          mt: 4,
        }}
      >
        <Button
          disabled={loading}
          color='primary'
          variant='contained'
          size='large'
          fullWidth
          onClick={async () => {
            await handleLogin();
          }}
        >
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>

        {isError && (
          <Typography
            variant='subtitle1'
            fontWeight={400}
            color='red'
            sx={{
              textAlign: 'center',
              my: 2,
            }}
          >
            {error}
          </Typography>
        )}

        <Box
          sx={{
            mt: 2,
          }}
        >
          <Button
            color='primary'
            variant='outlined'
            size='large'
            fullWidth
            component='a'
            onClick={() => {
              router.push('/auth/register');
            }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
      {subtitle}
    </>
  );
};
export default AuthLogin;
