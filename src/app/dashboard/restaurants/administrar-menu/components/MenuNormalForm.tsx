'use client';
import {
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
    soup: '',
    second: '',
    drink: '',
    dessert: '',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
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
          <TextField
            disabled={isLoadingData}
            placeholder='Ingrese la sopa'
            id='soup'
            name='soup'
            onChange={handleChange}
            value={values.soup}
            fullWidth
            error={!Boolean(values.soup)}
            helperText={Boolean(values.soup) ? '' : `La sopa es requerida`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Segundo</InputLabel>
          <TextField
            disabled={isLoadingData}
            placeholder='Ingrese el segundo'
            id='second'
            name='second'
            onChange={handleChange}
            value={values.second}
            fullWidth
            error={!Boolean(values.second)}
            helperText={Boolean(values.second) ? '' : `El segundo es requerido`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Jugo</InputLabel>
          <TextField
            disabled={isLoadingData}
            placeholder='Ingrese el juego'
            id='drink'
            name='drink'
            onChange={handleChange}
            value={values.drink}
            fullWidth
            error={!Boolean(values.drink)}
            helperText={Boolean(values.drink) ? '' : `El jugo es requerido`}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <InputLabel>Postre</InputLabel>
          <TextField
            disabled={isLoadingData}
            placeholder='Ingrese el postre'
            id='dessert'
            name='dessert'
            onChange={handleChange}
            value={values.dessert}
            fullWidth
            error={!Boolean(values.dessert)}
            helperText={Boolean(values.dessert) ? '' : `El postre es requerido`}
          />
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
            !Boolean(values.soup) ||
            !Boolean(values.second) ||
            !Boolean(values.drink) ||
            !Boolean(values.dessert) ||
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
