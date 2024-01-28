'use client';
import { mainApi } from '@/api/mainApi';
import CustomTextField from '@/app/dashboard/components/forms/theme-elements/CustomTextField';
import { UserResponse } from '@/shared/interfaces/user.interface';
import { loginFailure, loginSuccess } from '@/store/features/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
  const [showPassword, setShowPassword] = useState(false);
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
        if (response.restaurantId) {
          localStorage.setItem('restaurantId', response.restaurantId);
        }
        localStorage.setItem('x-token', response.access_token);
        localStorage.setItem('userRoles', JSON.stringify(response.roles));
        localStorage.setItem(
          'pedidos-user-identification',
          response.identification
        );
        localStorage.setItem('pedidos-user-name', response.fullName);
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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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

          <TextField
            fullWidth
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            defaultValue={password}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              setPassword(e.target.value);
            }}
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
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
      </Box>
      {subtitle}
    </>
  );
};
export default AuthLogin;
