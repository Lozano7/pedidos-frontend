'use client';
import { LocalizationWrapper } from '@/components/shared/LocalizationWrapper';
import ErrorAlert from '@/components/shared/alerts/ErrorAlert';
import SuccessAlert from '@/components/shared/alerts/SuccessAlert';
import {
  useAddMenuMutation,
  useLazyGetMenuByDateQuery,
  useUpdateMenuMutation,
} from '@/store/features/menu/menuApiSlice';
import { useGetRestaurantByRucQuery } from '@/store/features/restaurants/restaurantApiSlice';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { IMenu } from '../interfaces/menu.interface';
import { menuSchema } from '../schemas/menuSchema';
import { MenuControlDieta } from './MenuControlDieta';
import MenuControlNormal from './MenuControlNormal';

const steps = [
  {
    label: 'Menu Normal',
    type: 'N',
    Component: MenuControlNormal,
  },
  {
    label: 'Menu de Dieta',
    type: 'D',
    Component: MenuControlDieta,
  },
];

export const MenuWizzard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { fecha } = useParams();

  const {
    data: restaurantData,
    isFetching: isFetchingRestaurantData,
    isError: isErrorRestaurantData,
  } = useGetRestaurantByRucQuery({
    ruc:
      typeof window !== 'undefined'
        ? localStorage.getItem('restaurantId') || ''
        : '',
  });

  const [addMenu, { isLoading, isError, error, isSuccess, reset }] =
    useAddMenuMutation();

  const [
    editMenu,
    {
      isLoading: isEditing,
      isError: isEditError,
      isSuccess: isEditSuccess,
      error: editError,
      data: editData,
      reset: resetEdit,
    },
  ] = useUpdateMenuMutation();

  const [getMenuByDate, { data: menuData, isLoading: isLoadingMenuData }] =
    useLazyGetMenuByDateQuery();

  const { values, handleSubmit, resetForm, setFieldValue, errors, isValid } =
    useFormik({
      validationSchema: menuSchema,
      initialValues: {
        date: dayjs(new Date()),
        menus: [] as IMenu[],
        restaurantId:
          typeof window !== 'undefined'
            ? localStorage.getItem('restaurantId') || ''
            : '',
        restaurantName: '',
        restaurantAddress: '',
        restaurantStartOrderTime: '',
        restaurantEndOrderTime: '',
        restaurantDeliveryTime: '',
      },
      onSubmit: () => {
        if (fecha) {
          editMenu({
            fecha: fecha,
            body: {
              menus: values.menus.map(
                ({
                  dessert,
                  drink,
                  price,
                  second,
                  soup,
                  type,
                  restaurantId,
                  restaurantName,
                }) => ({
                  dessert,
                  drink,
                  price,
                  second,
                  soup,
                  type,
                  restaurantId,
                  restaurantName,
                })
              ),
              restaurantId: values.restaurantId,
              date: fecha.split('-').join('/'),
              restaurantName: values.restaurantName,
              restaurantAddress: values.restaurantAddress,
              restaurantStartOrderTime: values.restaurantStartOrderTime,
              restaurantEndOrderTime: values.restaurantEndOrderTime,
              restaurantDeliveryTime: values.restaurantDeliveryTime,
            },
          });
        } else {
          addMenu({
            date: values.date.format('MM/DD/YYYY'),
            menus: values.menus.map(
              ({
                dessert,
                drink,
                price,
                second,
                soup,
                type,
                restaurantId,
                restaurantName,
              }) => ({
                dessert,
                drink,
                price,
                second,
                soup,
                type,
                restaurantId,
                restaurantName,
              })
            ),
            restaurantId: values.restaurantId,
            restaurantName: values.restaurantName,
            restaurantAddress: values.restaurantAddress,
            restaurantStartOrderTime: values.restaurantStartOrderTime,
            restaurantEndOrderTime: values.restaurantEndOrderTime,
            restaurantDeliveryTime: values.restaurantDeliveryTime,
          });
        }
      },
    });

  useEffect(() => {
    if (restaurantData) {
      setFieldValue('restaurantName', restaurantData.name);
      setFieldValue('restaurantAddress', restaurantData.address);
      setFieldValue('restaurantStartOrderTime', restaurantData.startOrderTime);
      setFieldValue('restaurantEndOrderTime', restaurantData.endOrderTime);
      setFieldValue('restaurantDeliveryTime', restaurantData.deliveryTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantData]);

  useEffect(() => {
    if (fecha) {
      getMenuByDate({
        date: fecha,
        restaurantId:
          typeof window !== 'undefined'
            ? localStorage.getItem('restaurantId') || ''
            : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fecha]);

  useEffect(() => {
    if (menuData) {
      setFieldValue('date', dayjs(menuData.date));
      setFieldValue(
        'menus',
        menuData.menus.map((menu) => ({ ...menu, uuid: uuidv4() }))
      );
      setFieldValue('restaurantId', menuData.restaurantId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuData]);

  useEffect(() => {
    if (isSuccess || isEditSuccess) {
      setFieldValue('menus', []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isEditSuccess]);

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction='column' xs={6} spacing={2} p={2}>
          <Grid item xs={12} md={6} lg={6}>
            {(isSuccess || isEditSuccess) && (
              <SuccessAlert
                message={
                  fecha
                    ? 'Menu editado correctamente'
                    : 'Menu creado correctamente'
                }
                handleDismiss={() => {
                  if (fecha) {
                    resetEdit();
                  } else {
                    reset();
                  }
                }}
              />
            )}
            {(isError || isEditError) && (
              <ErrorAlert
                message={
                  (String(
                    ((error || editError) as any)?.response?.data?.message
                  ) || 'Error inesperado') as string
                }
                handleDismiss={() => {
                  if (fecha) {
                    resetEdit();
                  } else {
                    reset();
                  }
                }}
              />
            )}

            {isErrorRestaurantData && (
              <ErrorAlert
                message='No se pudo obtener los datos del restaurante, por favor intente nuevamente más tarde'
                handleDismiss={() => {
                  if (fecha) {
                    resetEdit();
                  } else {
                    reset();
                  }
                }}
              />
            )}
          </Grid>

          <Grid container item xs={6} spacing={2}>
            <Grid item xs={12}>
              <InputLabel>Fecha activa del menú</InputLabel>
              <LocalizationWrapper>
                <DatePicker
                  sx={{
                    width: '100%',
                  }}
                  disabled={isLoadingMenuData || isFetchingRestaurantData}
                  value={values.date}
                  onChange={(newValue) => {
                    setFieldValue('date', newValue);
                  }}
                />
              </LocalizationWrapper>
            </Grid>
            <Box sx={{ width: '100%', maxWidth: 500, mt: 2 }}>
              <Stepper nonLinear activeStep={activeStep} orientation='vertical'>
                {steps.map(({ label, Component, type }, index) => {
                  return (
                    <Step key={label}>
                      <StepButton type='button' onClick={handleStep(index)}>
                        <StepLabel>{label}</StepLabel>
                      </StepButton>
                      <StepContent>
                        <Component
                          type={type}
                          isEditing={Boolean(fecha)}
                          key={`menu-${index}`}
                          isFetchingRestaurantData={isFetchingRestaurantData}
                          isLoadingMenuData={isLoadingMenuData}
                          setFieldValue={setFieldValue}
                          values={values}
                        />
                      </StepContent>
                    </Step>
                  );
                })}
              </Stepper>
            </Box>
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
                {Boolean(fecha) ? 'Editar' : 'Guardar'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default MenuWizzard;
