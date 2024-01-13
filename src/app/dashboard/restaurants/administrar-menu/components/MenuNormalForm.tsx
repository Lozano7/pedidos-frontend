'use client';
import {
  useGetDessertsQuery,
  useGetDrinksQuery,
  useGetSecondsQuery,
  useGetSoupsQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IMenu } from '../interfaces/menu.interface';

interface Props {
  handleSetData: (data: IMenu[]) => void;
  isLoadingData: boolean;
  isEditing: boolean;
  type: string;
  valuesData: {
    date: dayjs.Dayjs;
    menus: IMenu[];
    restaurantId: string;
  };
}

const MenuNormalForm = ({
  handleSetData,
  isLoadingData,
  isEditing,
  type,
  valuesData,
}: Props) => {
  const [values, setValues] = useState({
    soup: null as any,
    second: null as any,
    drink: null as any,
    dessert: null as any,
    price: '',
  });

  const { data: soups, isFetching: isFetchingSoups } = useGetSoupsQuery({
    all: true,
    restaurantId:
      typeof window !== 'undefined'
        ? localStorage.getItem('restaurantId') || ''
        : '',
  });
  const { data: seconds, isFetching: isFetchingSeconds } = useGetSecondsQuery({
    all: true,
    restaurantId:
      typeof window !== 'undefined'
        ? localStorage.getItem('restaurantId') || ''
        : '',
  });

  const { data: desserts, isFetching: isFetchingDesserts } =
    useGetDessertsQuery({
      all: true,
      restaurantId:
        typeof window !== 'undefined'
          ? localStorage.getItem('restaurantId') || ''
          : '',
    });

  const { data: drinks, isFetching: isFetchingDrinks } = useGetDrinksQuery({
    all: true,
    restaurantId:
      typeof window !== 'undefined'
        ? localStorage.getItem('restaurantId') || ''
        : '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetFieldValue = (name: string, value: any) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleAddMenu = () => {
    if (valuesData.menus.length === 0) {
      handleSetData([
        {
          type: type as 'N' | 'D',
          soup: values.soup.name,
          second: values.second.name,
          drink: values.drink.name,
          dessert: values.dessert.name,
          price: values.price,
        },
      ]);
    } else {
      const newMenus = valuesData.menus.filter((menu) => menu.type !== type);
      newMenus.push({
        type: type as 'N' | 'D',
        soup: values.soup.name,
        second: values.second.name,
        drink: values.drink.name,
        dessert: values.dessert.name,
        price: values.price,
      });
      handleSetData(newMenus);
    }
  };

  useEffect(() => {
    if (valuesData.menus.length > 0) {
      const menu = valuesData.menus.find((menu) => menu.type === type);
      if (menu) {
        setValues({
          soup: menu.soup,
          second: menu.second,
          drink: menu.drink,
          dessert: menu.dessert,
          price: menu.price,
        });
      } else {
        setValues({
          soup: '',
          second: '',
          drink: '',
          dessert: '',
          price: '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesData.menus]);

  return (
    <Grid container direction='column' xs={12} spacing={2} p={2}>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Sopa</InputLabel>
          {isFetchingSoups || isLoadingData ? (
            <CircularProgress />
          ) : (
            <Autocomplete
              disabled={isLoadingData}
              options={Array.isArray(soups) ? soups : []}
              getOptionLabel={(option) => option.name}
              id='soup'
              onChange={(event, value) => {
                handleSetFieldValue('soup', value);
              }}
              value={values.soup}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={!Boolean(values.soup)}
                  helperText={
                    Boolean(values.soup) ? '' : `La sopa es requerida`
                  }
                />
              )}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Segundo</InputLabel>
          {isFetchingSeconds || isLoadingData ? (
            <CircularProgress />
          ) : (
            <Autocomplete
              disabled={isLoadingData}
              options={Array.isArray(seconds) ? seconds : []}
              getOptionLabel={(option) => option.name}
              id='second'
              onChange={(event, value) => {
                handleSetFieldValue('second', value);
              }}
              value={values.soup}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={!Boolean(values.soup)}
                  helperText={
                    Boolean(values.soup) ? '' : `El segundo es requerido`
                  }
                />
              )}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Jugo</InputLabel>
          {isFetchingDrinks || isLoadingData ? (
            <CircularProgress />
          ) : (
            <Autocomplete
              disabled={isLoadingData}
              options={Array.isArray(drinks) ? drinks : []}
              getOptionLabel={(option) => option.name}
              id='drink'
              onChange={(event, value) => {
                handleSetFieldValue('drink', value);
              }}
              value={values.soup}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={!Boolean(values.soup)}
                  helperText={
                    Boolean(values.soup) ? '' : `La bebida es requerida`
                  }
                />
              )}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Postre</InputLabel>
          {isFetchingDesserts || isLoadingData ? (
            <CircularProgress />
          ) : (
            <Autocomplete
              disabled={isLoadingData}
              options={Array.isArray(desserts) ? desserts : []}
              getOptionLabel={(option) => option.name}
              id='drink'
              onChange={(event, value) => {
                handleSetFieldValue('dessert', value);
              }}
              value={values.soup}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={!Boolean(values.soup)}
                  helperText={
                    Boolean(values.soup) ? '' : `El postre es requerido`
                  }
                />
              )}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Precio</InputLabel>
          <TextField
            disabled={isLoadingData}
            placeholder='Ingrese el precio'
            id='price'
            name='price'
            onChange={
              isNaN(Number(values.price))
                ? () => {
                    setValues({
                      ...values,
                      price: '',
                    });
                  }
                : handleChange
            }
            value={values.price}
            fullWidth
            error={!Boolean(values.price) || isNaN(Number(values.price))}
            helperText={
              Boolean(values.price) && !isNaN(Number(values.price))
                ? ''
                : `El precio es requerido`
            }
          />
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Button
          onClick={handleAddMenu}
          variant='contained'
          size='large'
          disabled={
            isLoadingData ||
            !Boolean(values.soup?.name) ||
            !Boolean(values.second?.name) ||
            !Boolean(values.drink?.name) ||
            !Boolean(values.dessert?.name) ||
            !Boolean(values.price) ||
            isNaN(Number(values.price))
          }
          endIcon={isLoadingData && <CircularProgress size={20} />}
        >
          {isEditing ? 'Editar' : 'Agregar'}
        </Button>
        <Button
          sx={{
            ml: 2,
          }}
          onClick={() => {
            const newMenus = valuesData.menus.filter(
              (menu) => menu.type !== type
            );
            handleSetData(newMenus);
            setValues({
              soup: '',
              second: '',
              drink: '',
              dessert: '',
              price: '',
            });
          }}
          variant='contained'
          size='large'
          disabled={isLoadingData}
          endIcon={isLoadingData && <CircularProgress size={20} />}
        >
          Eliminar
        </Button>
      </Grid>
    </Grid>
  );
};

export default MenuNormalForm;
