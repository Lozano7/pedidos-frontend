'use client';
import ErrorAlert from '@/components/shared/alerts/ErrorAlert';
import SuccessAlert from '@/components/shared/alerts/SuccessAlert';
import {
  useAddSecondMutation,
  useEditSecondMutation,
  useLazyGetSecondByNameByRestaurantIdQuery,
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

const SecondFrom = () => {
  const { name, restaurantId } = useParams();

  const [addSecond, { isLoading, isError, error, isSuccess, reset, data }] =
    useAddSecondMutation();

  const [
    editSecond,
    {
      isLoading: isEditing,
      isError: isEditError,
      isSuccess: isEditSuccess,
      error: editError,
      data: editData,
    },
  ] = useEditSecondMutation();

  const [
    getSecondByNameAndRestaurantId,
    { data: secondData, isFetching: isLoadingSecondData },
  ] = useLazyGetSecondByNameByRestaurantIdQuery();

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
        editSecond({
          name: name,
          body: {
            name: values.name,
            restaurantId: values.restaurantId,
            type: values.type.value,
          },
        });
      } else {
        addSecond({
          name: values.name,
          restaurantId: values.restaurantId,
          type: values.type.value,
        });
      }
    },
  });

  useEffect(() => {
    if (name && restaurantId) {
      getSecondByNameAndRestaurantId({
        name: name,
        restaurantId: restaurantId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, restaurantId]);

  useEffect(() => {
    if (secondData) {
      setFieldValue('name', secondData.name);
      setFieldValue(
        'type',
        typeMenu.find((t) => t.value === secondData.type)
      );
      setFieldValue('restaurantId', secondData.restaurantId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondData]);

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
                    ? 'Segundo editado correctamente'
                    : 'Segundo creado correctamente'
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
                disabled={isLoadingSecondData}
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
              {isLoadingSecondData && secondData ? (
                <CircularProgress />
              ) : (
                <Autocomplete
                  disabled={isLoadingSecondData}
                  options={typeMenu}
                  id='type'
                  onChange={(event, value) => {
                    setFieldValue('type', value);
                  }}
                  value={values.type}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
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

export default SecondFrom;
