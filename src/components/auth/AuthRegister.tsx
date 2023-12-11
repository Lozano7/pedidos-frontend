'use client';
import { Box, Button, Typography } from '@mui/material';

import { mainApi } from '@/api/mainApi';
import CustomTextField from '@/app/dashboard/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { data: response } = await mainApi.post<{
        email: string;
        access_token: string;
      }>('/auth/register', {
        email,
        password,
      });
      if (response) {
        localStorage.setItem('x-token', response.access_token);
        router.push('/dashboard/change-status');
      }
    } catch (error: any) {
      setIsError(true);
      setError(error?.response?.data?.message || 'Error');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password !== password_confirm) {
      setIsError(true);
      setError('Las contraseñas no coinciden');
    } else {
      setIsError(false);
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password_confirm]);

  return (
    <>
      {title ? (
        <Typography fontWeight='700' variant='h2' mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
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

          <Box mt='25px'>
            <Typography
              variant='subtitle1'
              fontWeight={600}
              component='label'
              htmlFor='password'
              mb='5px'
            >
              Confirmar Contraseña
            </Typography>
            <CustomTextField
              type='password'
              variant='outlined'
              fullWidth
              value={password_confirm}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </Box>
        </Stack>
        <Button
          disabled={loading || password !== password_confirm}
          color='primary'
          variant='contained'
          size='large'
          fullWidth
          onClick={async () => {
            await handleRegister();
          }}
        >
          {loading ? 'Cargando...' : 'Registrarse'}
        </Button>
        {isError && (
          <Typography
            variant='subtitle1'
            fontWeight={400}
            color='red'
            sx={{
              textAlign: 'center',
              mt: 4,
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
