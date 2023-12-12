import ErrorAlert from '@/components/shared/alerts/ErrorAlert';
import SuccessAlert from '@/components/shared/alerts/SuccessAlert';
import { useAddUserMutation } from '@/store/features/users/userApiSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { userSchema } from '../schema/userSchema';

const UsersForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addUser, { isLoading, isError, error, isSuccess, reset, data }] =
    useAddUserMutation();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: userSchema,
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastName: '',
      identification: '',
      roles: [],
    },
    onSubmit: () => {
      addUser({
        email: values.email,
        password: values.password,
        name: values.name,
        lastName: values.lastName,
        identification: values.identification,
        roles: values.roles,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction='column'
          item
          xs={12}
          md={6}
          spacing={2}
          p={2}
        >
          <Grid item xs={12} md={6} lg={6}>
            {isSuccess && (
              <SuccessAlert
                message='Usuario creado correctamente'
                handleDismiss={() => reset()}
              />
            )}
            {isError && (
              <ErrorAlert
                message={(String(error) || 'Error inesperado') as string}
                handleDismiss={() => reset()}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel>Nombres</InputLabel>
            <TextField
              placeholder='Ingrese el nombre'
              id='name'
              name='name'
              onChange={handleChange}
              value={values.name}
              fullWidth
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={
                Boolean(errors.name) && Boolean(touched.name)
                  ? `${errors.name}`
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel>Apellidos</InputLabel>
            <TextField
              placeholder='Ingrese los apellidos'
              id='lastName'
              name='lastName'
              onChange={handleChange}
              value={values.lastName}
              fullWidth
              error={Boolean(errors.lastName) && Boolean(touched.lastName)}
              helperText={
                Boolean(errors.lastName) && Boolean(touched.lastName)
                  ? `${errors.lastName}`
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel>Identificación</InputLabel>
            <TextField
              placeholder='Ingrese los apellidos'
              id='identification'
              name='identification'
              onChange={handleChange}
              value={values.identification}
              fullWidth
              error={
                Boolean(errors.identification) &&
                Boolean(touched.identification)
              }
              helperText={
                Boolean(errors.identification) &&
                Boolean(touched.identification)
                  ? `${errors.identification}`
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel>Email</InputLabel>
            <TextField
              placeholder='Ingrese los apellidos'
              type='email'
              id='email'
              name='email'
              onChange={handleChange}
              value={values.email}
              fullWidth
              error={Boolean(errors.email) && Boolean(touched.email)}
              helperText={
                Boolean(errors.email) && Boolean(touched.email)
                  ? `${errors.email}`
                  : ''
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel>Contraseña </InputLabel>
            <TextField
              id='password'
              name='password'
              placeholder='Ingrese la contraseña'
              type={showPassword ? 'text' : 'password'}
              defaultValue={values.password}
              onChange={handleChange}
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
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel>Confirmar Contraseña</InputLabel>
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirme la contraseña'
              type={showConfirmPassword ? 'text' : 'password'}
              defaultValue={values.confirmPassword}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel>Roles</InputLabel>
            <Autocomplete
              options={statusOptions}
              renderInput={(props) => (
                <TextField
                  {...props}
                  placeholder='Seleccione los roles'
                  error={Boolean(errors.roles) && Boolean(touched.roles)}
                  helperText={roles ? `${t(errors.roles || '')}` : ''}
                />
              )}
              value={
                statusOptions.find((item) => item.value === values.roles) ||
                null
              }
              onChange={(event, newValue) => {
                setFieldValue('roles', newValue?.value!);
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isLoading}
              endIcon={isLoading && <CircularProgress size={20} />}
            >
              Crear
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UsersForm;
