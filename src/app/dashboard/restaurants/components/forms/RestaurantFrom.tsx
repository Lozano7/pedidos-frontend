import { LocalizationWrapper } from '@/components/shared/LocalizationWrapper';
import ErrorAlert from '@/components/shared/alerts/ErrorAlert';
import SuccessAlert from '@/components/shared/alerts/SuccessAlert';
import {
  useAddRestaurantMutation,
  useEditRestaurantMutation,
  useLazyGetRestaurantByRucQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { restaurantSchema } from '../schema/restaurantSchema';

const status = [
  {
    value: 'A',
    label: 'Activo',
  },
  {
    value: 'I',
    label: 'Inactivo',
  },
];

const RestaurantFrom = () => {
  const { id } = useParams();

  const [addRestaurant, { isLoading, isError, error, isSuccess, reset, data }] =
    useAddRestaurantMutation();

  const [
    editRestaurant,
    {
      isLoading: isEditing,
      isError: isEditError,
      isSuccess: isEditSuccess,
      error: editError,
      data: editData,
    },
  ] = useEditRestaurantMutation();

  const [
    getRestaurantByRuc,
    { data: restaurantData, isLoading: isLoadingRestaurantData },
  ] = useLazyGetRestaurantByRucQuery();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: restaurantSchema,
    initialValues: {
      name: '',
      ruc: '',
      adminName: '',
      address: '',
      status: '',
      phone: '',
      startOrderTime: '',
      endOrderTime: '',
      deliveryTime: '',
    },
    onSubmit: () => {
      if (id) {
        editRestaurant({
          name: values.name,
          ruc: values.ruc,
          adminName: values.adminName,
          address: values.address,
          status: values.status,
          phone: values.phone,
          startOrderTime: dayjs(values.startOrderTime).format('HH:mm'),
          endOrderTime: dayjs(values.endOrderTime).format('HH:mm'),
          deliveryTime: dayjs(values.deliveryTime).format('HH:mm'),
        });
      } else {
        addRestaurant({
          name: values.name,
          ruc: values.ruc,
          adminName: values.adminName,
          address: values.address,
          status: values.status,
          phone: values.phone,
          startOrderTime: dayjs(values.startOrderTime).format('HH:mm'),
          endOrderTime: dayjs(values.endOrderTime).format('HH:mm'),
          deliveryTime: dayjs(values.deliveryTime).format('HH:mm'),
        });
      }
    },
  });

  useEffect(() => {
    if (id) {
      getRestaurantByRuc({
        ruc: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (restaurantData) {
      setFieldValue('name', restaurantData.name);
      setFieldValue('ruc', restaurantData.ruc);
      setFieldValue('adminName', restaurantData.adminName);
      setFieldValue('address', restaurantData.address);
      setFieldValue('status', restaurantData.status);
      setFieldValue('phone', restaurantData.phone);

      const startOrderTime = new Date();
      startOrderTime.setHours(
        Number(restaurantData.startOrderTime.split(':')[0]),
        Number(restaurantData.startOrderTime.split(':')[1])
      );
      setFieldValue('startOrderTime', startOrderTime);

      const endOrderTime = new Date();
      endOrderTime.setHours(
        Number(restaurantData.endOrderTime.split(':')[0]),
        Number(restaurantData.endOrderTime.split(':')[1])
      );
      setFieldValue('endOrderTime', endOrderTime);

      const deliveryTime = new Date();
      deliveryTime.setHours(
        Number(restaurantData.deliveryTime.split(':')[0]),
        Number(restaurantData.deliveryTime.split(':')[1])
      );
      setFieldValue('deliveryTime', deliveryTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantData]);

  useEffect(() => {
    if (isSuccess) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isEditSuccess]);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column' xs={12} spacing={2} p={2}>
          <Grid item xs={12} md={6} lg={6}>
            {isSuccess ||
              (isEditSuccess && (
                <SuccessAlert
                  message={
                    id
                      ? 'Usuario editado correctamente'
                      : 'Usuario creado correctamente'
                  }
                  handleDismiss={() => reset()}
                />
              ))}
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
              <InputLabel>Nombre</InputLabel>
              <TextField
                disabled={isLoadingRestaurantData}
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
              <InputLabel>RUC</InputLabel>
              <TextField
                disabled={isLoadingRestaurantData}
                placeholder='Ingrese el RUC'
                id='ruc'
                name='ruc'
                onChange={handleChange}
                value={values.ruc}
                fullWidth
                error={Boolean(errors.ruc) && Boolean(touched.ruc)}
                helperText={
                  Boolean(errors.ruc) && Boolean(touched.ruc)
                    ? `${errors.ruc}`
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Teléfono</InputLabel>
              <TextField
                disabled={isLoadingRestaurantData}
                placeholder='Ingrese el teléfono'
                id='phone'
                name='phone'
                onChange={handleChange}
                value={values.phone}
                fullWidth
                error={Boolean(errors.phone) && Boolean(touched.phone)}
                helperText={
                  Boolean(errors.phone) && Boolean(touched.phone)
                    ? `${errors.phone}`
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Administrador</InputLabel>
              <TextField
                disabled={isLoadingRestaurantData}
                placeholder='Ingrese el nombre del administrador'
                id='adminName'
                name='adminName'
                onChange={handleChange}
                value={values.adminName}
                fullWidth
                error={Boolean(errors.adminName) && Boolean(touched.adminName)}
                helperText={
                  Boolean(errors.adminName) && Boolean(touched.adminName)
                    ? `${errors.adminName}`
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Dirección</InputLabel>
              <TextField
                disabled={isLoadingRestaurantData}
                placeholder='Ingrese la dirección'
                id='address'
                name='address'
                onChange={handleChange}
                value={values.address}
                fullWidth
                error={Boolean(errors.address) && Boolean(touched.address)}
                helperText={
                  Boolean(errors.address) && Boolean(touched.address)
                    ? `${errors.address}`
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Estado</InputLabel>
              {isLoadingRestaurantData && restaurantData ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  disabled={isLoadingRestaurantData}
                  options={status}
                  getOptionLabel={(option) => option.label}
                  id='status'
                  onChange={(event, value) => {
                    setFieldValue('status', value?.value);
                  }}
                  value={status.find(
                    (option) => option.value === values.status
                  )}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      error={Boolean(errors.status) && Boolean(touched.status)}
                      helperText={
                        Boolean(errors.status) && Boolean(touched.status)
                          ? `${errors.status}`
                          : ''
                      }
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Hora de inicio del pedido</InputLabel>
              <LocalizationWrapper>
                <TimePicker
                  disabled={isLoadingRestaurantData}
                  value={values.startOrderTime}
                  onChange={(newValue) => {
                    setFieldValue('startOrderTime', newValue);
                  }}
                />
              </LocalizationWrapper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Hora de fin del Pedido</InputLabel>
              <LocalizationWrapper>
                <TimePicker
                  disabled={isLoadingRestaurantData}
                  value={values.endOrderTime}
                  onChange={(newValue) => {
                    setFieldValue('endOrderTime', newValue);
                  }}
                />
              </LocalizationWrapper>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <InputLabel>Tiempo de entrega</InputLabel>
              <LocalizationWrapper>
                <TimePicker
                  disabled={isLoadingRestaurantData}
                  value={values.deliveryTime}
                  onChange={(newValue) => {
                    setFieldValue('deliveryTime', newValue);
                  }}
                />
              </LocalizationWrapper>
            </Grid>
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

export default RestaurantFrom;
