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
import { IconCheck, IconX } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
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
    soup: '',
    second: '',
    drink: '',
    dessert: '',
    price: '',
  });

  const [soups, setSoups] = useState<string[]>([]);
  const [seconds, setSeconds] = useState<string[]>([]);
  const [drinks, setDrinks] = useState<string[]>([]);
  const [desserts, setDesserts] = useState<string[]>([]);

  const buttonAdd = useRef<HTMLButtonElement>(null);

  const { data: soupsData, isFetching: isFetchingSoups } = useGetSoupsQuery({
    all: true,
    restaurantId:
      typeof window !== 'undefined'
        ? localStorage.getItem('restaurantId') || ''
        : '',
  });
  const { data: secondsData, isFetching: isFetchingSeconds } =
    useGetSecondsQuery({
      all: true,
      restaurantId:
        typeof window !== 'undefined'
          ? localStorage.getItem('restaurantId') || ''
          : '',
    });

  const { data: dessertsData, isFetching: isFetchingDesserts } =
    useGetDessertsQuery({
      all: true,
      restaurantId:
        typeof window !== 'undefined'
          ? localStorage.getItem('restaurantId') || ''
          : '',
    });

  const { data: drinksData, isFetching: isFetchingDrinks } = useGetDrinksQuery({
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
          soup: values.soup,
          second: values.second,
          drink: values.drink,
          dessert: values.dessert,
          price: values.price,
        },
      ]);
    } else {
      const newMenus = valuesData.menus.filter((menu) => menu.type !== type);
      newMenus.push({
        type: type as 'N' | 'D',
        soup: values.soup,
        second: values.second,
        drink: values.drink,
        dessert: values.dessert,
        price: values.price,
      });
      handleSetData(newMenus);
    }
    //Cambiar el color de buttonAdd por un segundo y luego volverlo a la normalidad
    if (buttonAdd.current) {
      buttonAdd.current.style.backgroundColor = '#4caf50';
      setTimeout(() => {
        if (buttonAdd.current) {
          buttonAdd.current.style.backgroundColor = '#556cd6';
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (soupsData && Array.isArray(soupsData)) {
      const soupsMap = soupsData.map((soup) => soup.name);
      setSoups(soupsMap);
    }
  }, [soupsData]);

  useEffect(() => {
    if (secondsData && Array.isArray(secondsData)) {
      const secondsMap = secondsData.map((second) => second.name);
      setSeconds(secondsMap);
    }
  }, [secondsData]);

  useEffect(() => {
    if (dessertsData && Array.isArray(dessertsData)) {
      const dessertsMap = dessertsData.map((dessert) => dessert.name);
      setDesserts(dessertsMap);
    }
  }, [dessertsData]);

  useEffect(() => {
    if (drinksData && Array.isArray(drinksData)) {
      const drinksMap = drinksData.map((drink) => drink.name);
      setDrinks(drinksMap);
    }
  }, [drinksData]);

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
              options={soups}
              id='soup'
              onChange={(event, value) => {
                handleSetFieldValue('soup', value);
              }}
              value={
                values.soup && soups
                  ? soups.find((soup) => soup === values.soup) || null
                  : null
              }
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
              options={seconds}
              id='second'
              onChange={(event, value) => {
                handleSetFieldValue('second', value);
              }}
              value={
                values.second && seconds
                  ? seconds.find((second) => second === values.second) || null
                  : null
              }
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={!Boolean(values.second)}
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
              options={drinks}
              id='drink'
              onChange={(event, value) => {
                handleSetFieldValue('drink', value);
              }}
              value={
                values.drink && drinks
                  ? drinks.find((drink) => drink === values.drink) || null
                  : null
              }
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={!Boolean(values.drink)}
                  helperText={
                    Boolean(values.drink) ? '' : `La bebida es requerida`
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
              options={desserts}
              id='drink'
              onChange={(event, value) => {
                handleSetFieldValue('dessert', value);
              }}
              value={
                values.dessert && desserts
                  ? desserts.find((dessert) => dessert === values.dessert) ||
                    null
                  : null
              }
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  error={!Boolean(values.dessert)}
                  helperText={
                    Boolean(values.dessert) ? '' : `El postre es requerido`
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
          ref={buttonAdd}
          onClick={handleAddMenu}
          variant='contained'
          size='large'
          disabled={
            isLoadingData ||
            !Boolean(values.soup) ||
            !Boolean(values.second) ||
            !Boolean(values.drink) ||
            !Boolean(values.dessert) ||
            !Boolean(values.price) ||
            isNaN(Number(values.price))
          }
          endIcon={isLoadingData && <CircularProgress size={20} />}
        >
          <IconCheck size={20} />
        </Button>
        <Button
          color='error'
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
          <IconX size={20} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default MenuNormalForm;
