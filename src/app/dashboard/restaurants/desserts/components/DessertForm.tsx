'use client';
import ErrorAlert from '@/components/shared/alerts/ErrorAlert';
import SuccessAlert from '@/components/shared/alerts/SuccessAlert';
import {
  useAddDessertMutation,
  useEditDessertMutation,
  useLazyGetDessertByNameByRestaurantIdQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const typeMenu = [
  { value: 'N', label: 'Normal' },
  { value: 'D', label: 'Dieta' },
];

const DessertForm = () => {
  const { name, restaurantId } = useParams();

  const [addDessert, { isLoading, isError, error, isSuccess, reset, data }] =
    useAddDessertMutation();

  const [
    editDessert,
    {
      isLoading: isEditing,
      isError: isEditError,
      isSuccess: isEditSuccess,
      error: editError,
      data: editData,
    },
  ] = useEditDessertMutation();

  const [
    getDessertByNameAndRestaurantId,
    { data: dessertData, isFetching: isLoadingDrinkData },
  ] = useLazyGetDessertByNameByRestaurantIdQuery();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
    touched,
    setFieldValue,
  } = useFormik({
    // validationSchema: restaurantSchema,
    initialValues: {
      name: '',
      type: { value: 'N', label: 'Normal' },
      restaurantId:
        typeof window !== 'undefined'
          ? localStorage.getItem('restaurantId') || ''
          : '',
    },
    onSubmit: () => {
      if (name && restaurantId) {
        editDessert({
          name: name,
          body: {
            name: values.name,
            restaurantId: values.restaurantId,
            type: values.type.value,
          },
        });
      } else {
        addDessert({
          name: values.name,
          restaurantId: values.restaurantId,
          type: values.type.value,
        });
      }
    },
  });

  useEffect(() => {
    if (name && restaurantId) {
      getDessertByNameAndRestaurantId({
        name: name,
        restaurantId: restaurantId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, restaurantId]);

  useEffect(() => {
    if (dessertData) {
      setFieldValue('name', dessertData.name);
      setFieldValue(
        'type',
        typeMenu.find((t) => t.value === dessertData.type)
      );
      setFieldValue('restaurantId', dessertData.restaurantId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dessertData]);

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
            {(isSuccess || isEditSuccess) && (
              <SuccessAlert
                message={
                  name && restaurantId
                    ? 'Postre editado correctamente'
                    : 'Postre creado correctamente'
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
              <InputLabel>Nombre</InputLabel>
              <TextField
                disabled={isLoadingDrinkData}
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
              <InputLabel>Tipo</InputLabel>
              {isLoadingDrinkData && dessertData ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  disabled={isLoadingDrinkData}
                  options={typeMenu}
                  getOptionLabel={(option) => option.label}
                  id='type'
                  onChange={(event, value) => {
                    setFieldValue('type', value);
                  }}
                  value={values.type}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      error={Boolean(errors.type) && Boolean(touched.type)}
                      helperText={
                        Boolean(errors.type) && Boolean(touched.type)
                          ? `${errors.type}`
                          : ''
                      }
                    />
                  )}
                />
              )}
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
              {name && restaurantId ? 'Editar' : 'Crear'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DessertForm;
