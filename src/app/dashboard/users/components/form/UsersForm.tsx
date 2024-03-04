'use client';
import ErrorAlert from '@/components/shared/alerts/ErrorAlert';
import SuccessAlert from '@/components/shared/alerts/SuccessAlert';
import { IRestaurant } from '@/store/features/restaurants/interfaces/restaurant-response.interface';
import { useLazyGetRestaurantsQuery } from '@/store/features/restaurants/restaurantApiSlice';
import { RolesData } from '@/store/features/roles/interfaces/roles.interface';
import { useGetRolesQuery } from '@/store/features/roles/rolesApiSlice';
import {
  useAddUserMutation,
  useEditUserMutation,
  useLazyGetUserByIdentificationQuery,
} from '@/store/features/users/userApiSlice';
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
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { userSchema, userSchemaEdit } from '../schema/userSchema';

const UsersForm = () => {
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isViewRestaurants, setIsViewRestaurants] = useState(false);

  const { data: rolesData, isFetching: isFetchingRoles } = useGetRolesQuery({
    all: true,
  });

  const [
    getRestaurants,
    { data: restaurantsData, isFetching: isFetchingRestaurants },
  ] = useLazyGetRestaurantsQuery();

  const [addUser, { isLoading, isError, error, isSuccess, reset, data }] =
    useAddUserMutation();

  const [
    editUser,
    {
      isLoading: isEditing,
      isError: isEditError,
      isSuccess: isEditSuccess,
      error: editError,
      data: editData,
    },
  ] = useEditUserMutation();

  const [
    getUserByIdentification,
    { data: userData, isLoading: isLoadingUserData },
  ] = useLazyGetUserByIdentificationQuery();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: id ? userSchemaEdit : userSchema,
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastName: '',
      identification: '',
      restaurantId: {} as IRestaurant,
      roles: [],
    },
    onSubmit: () => {
      if (id) {
        editUser({
          email: values.email,
          name: values.name,
          lastName: values.lastName,
          identification: values.identification,
          restaurantId: values.restaurantId.ruc || '',
          roles: values.roles.map((role: any) => role.keyword),
        });
      } else {
        addUser({
          email: values.email,
          password: values.password,
          name: values.name,
          lastName: values.lastName,
          identification: values.identification,
          restaurantId: values.restaurantId.ruc || '',
          roles: values.roles.map((role: any) => role.keyword),
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      getUserByIdentification({
        identification: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!id) {
      if (
        (values.roles as RolesData[])
          .map((item) => item.keyword)
          .includes('RESTAURANT')
      ) {
        setIsViewRestaurants(true);
        getRestaurants({
          all: true,
        });
      } else {
        if (isViewRestaurants) {
          setIsViewRestaurants(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.roles, id]);

  useEffect(() => {
    const executeGetRestaurants = async (ruc: string) => {
      const { data: restaurants } = await getRestaurants({
        all: true,
      });

      if (restaurants && Array.isArray(restaurants)) {
        const restaurant = restaurants?.find((item) => item.ruc === ruc);
        console.log('Este es el restaurante: ', restaurant);
        if (restaurant) {
          setFieldValue('restaurantId', restaurant);
        }
      }
    };

    if (userData && rolesData && Array.isArray(rolesData)) {
      setFieldValue('email', userData.email);
      setFieldValue('name', userData.name);
      setFieldValue('lastName', userData.lastName);
      setFieldValue('identification', userData.identification);
      setFieldValue(
        'roles',
        rolesData?.filter((item) => userData.roles.includes(item.keyword))
      );

      if (userData.roles.includes('RESTAURANT')) {
        executeGetRestaurants(userData.restaurantId);
        setIsViewRestaurants(true);
      } else {
        if (isViewRestaurants) {
          setIsViewRestaurants(false);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, rolesData]);

  useEffect(() => {
    if (isSuccess) {
      setFieldValue('roles', []);
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isEditSuccess]);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const filterOptionsSeletedRoles = (value: string) => {
    const isSeleted = values.roles.find((item: any) => item.keyword === value);
    if (isSeleted) {
      return false;
    }

    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column' xs={12} spacing={2} p={2}>
          <Grid item xs={12} md={6} lg={6}>
            {(isSuccess || isEditSuccess) && (
              <SuccessAlert
                message={
                  id
                    ? 'Usuario editado correctamente'
                    : 'Usuario creado correctamente'
                }
                handleDismiss={() => reset()}
              />
            )}
            {(isError || isEditError) && (
              <ErrorAlert
                message={
                  (String(
                    ((error || editError) as any)?.response?.data?.message
                  ) || 'Error inesperado') as string
                }
                handleDismiss={() => reset()}
              />
            )}
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Nombres</InputLabel>
              <TextField
                disabled={isLoadingUserData}
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
                disabled={isLoadingUserData}
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
                disabled={isLoadingUserData}
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
                disabled={isLoadingUserData}
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
            {!id && (
              <>
                <Grid item xs={12} md={6} lg={6}>
                  <InputLabel>Contraseña </InputLabel>
                  <TextField
                    fullWidth
                    id='password'
                    name='password'
                    placeholder='Ingrese la contraseña'
                    type={showPassword ? 'text' : 'password'}
                    defaultValue={values.password}
                    onChange={handleChange}
                    value={values.password}
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
                    error={
                      Boolean(errors.password) && Boolean(touched.password)
                    }
                    helperText={
                      Boolean(errors.password) && Boolean(touched.password)
                        ? `${errors.password}`
                        : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <InputLabel>Confirmar Contraseña</InputLabel>
                  <TextField
                    fullWidth
                    id='confirmPassword'
                    name='confirmPassword'
                    placeholder='Confirme la contraseña'
                    type={showConfirmPassword ? 'text' : 'password'}
                    defaultValue={values.confirmPassword}
                    value={values.confirmPassword}
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
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={
                      Boolean(errors.confirmPassword) &&
                      Boolean(touched.confirmPassword)
                    }
                    helperText={
                      Boolean(errors.confirmPassword) &&
                      Boolean(touched.confirmPassword)
                        ? `${errors.confirmPassword}`
                        : ''
                    }
                  />
                </Grid>
              </>
            )}

            {id ? (
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>Roles</InputLabel>
                <Autocomplete
                  disabled={isLoadingUserData}
                  options={
                    rolesData && Array.isArray(rolesData)
                      ? rolesData.filter((item) =>
                          filterOptionsSeletedRoles(item.keyword)
                        )
                      : []
                  }
                  multiple
                  getOptionLabel={(option) => option.name || 'sin nombre'}
                  loading={isFetchingRoles}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      placeholder='Seleccione los roles'
                      fullWidth
                      error={Boolean(errors.roles) && Boolean(touched.roles)}
                      helperText={
                        Boolean(errors.roles) && Boolean(touched.roles)
                          ? `${errors.roles}`
                          : ''
                      }
                    />
                  )}
                  value={values.roles}
                  onChange={(event, newValue) => {
                    setFieldValue('roles', newValue);
                  }}
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>Roles</InputLabel>
                <Autocomplete
                  disabled={isLoadingUserData}
                  options={
                    rolesData && Array.isArray(rolesData) ? rolesData : []
                  }
                  multiple
                  getOptionLabel={(option) => option.name}
                  loading={isFetchingRoles}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      placeholder='Seleccione los roles'
                      fullWidth
                      error={Boolean(errors.roles) && Boolean(touched.roles)}
                      helperText={
                        Boolean(errors.roles) && Boolean(touched.roles)
                          ? `${errors.roles}`
                          : ''
                      }
                    />
                  )}
                  onChange={(event, newValue) => {
                    setFieldValue('roles', newValue);
                  }}
                />
              </Grid>
            )}
            {isViewRestaurants && (
              <Grid item xs={12} md={6} lg={6}>
                <InputLabel>Restaurante</InputLabel>

                <Autocomplete
                  disabled={isFetchingRestaurants}
                  options={
                    restaurantsData && Array.isArray(restaurantsData)
                      ? restaurantsData
                      : []
                  }
                  getOptionLabel={(option) => option.name}
                  loading={isFetchingRestaurants}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      placeholder='Seleccione el restaurante'
                      fullWidth
                      error={
                        Boolean(errors.restaurantId) &&
                        Boolean(touched.restaurantId)
                      }
                      helperText={
                        Boolean(errors.restaurantId) &&
                        Boolean(touched.restaurantId)
                          ? `${errors.restaurantId}`
                          : ''
                      }
                    />
                  )}
                  value={values.restaurantId}
                  onChange={(event, newValue) => {
                    setFieldValue('restaurantId', newValue);
                  }}
                />
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isLoading || isEditing}
              endIcon={
                (isLoading || isEditing) && <CircularProgress size={20} />
              }
            >
              {id ? 'Editar' : 'Crear'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UsersForm;
