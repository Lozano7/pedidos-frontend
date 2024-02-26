import { Button, Grid, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Component = dynamic(() => import('./MenuNormalForm'));

interface MenuControlProps {
  type: string;
  setFieldValue: (field: string, value: any) => void;
  isLoadingMenuData: boolean;
  isFetchingRestaurantData: boolean;
  fecha?: string;
  values: any;
  isEditing?: boolean;
}

const MenuControlNormal = ({
  type,
  setFieldValue,
  isLoadingMenuData,
  isFetchingRestaurantData,
  fecha,
  values,
  isEditing,
}: MenuControlProps) => {
  const [uuids, setUuids] = useState<string[]>([]);

  const addComponent = () => {
    const uuid = uuidv4();
    setUuids([...uuids, uuid]);
  };
  const removeComponent = (uuidToRemove: string) => {
    setUuids(uuids.filter((uuid) => uuid !== uuidToRemove));
  };

  useEffect(() => {
    if (values.menus && values.menus.length > 0) {
      const uuidsEdit = values.menus
        .filter((menu: any) => menu.type === 'N')
        .map((menu: any) => menu.uuid);

      setUuids(uuidsEdit);
    }
  }, [values]);

  useEffect(() => {
    if (!isEditing && values.menus.length === 0) {
      setUuids([uuidv4()]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  return (
    <>
      {uuids.map((uuid, index) => (
        <>
          {
            //Aqui va titulo indicando el numeor de menu con el idex +1
          }
          <Typography
            variant='h6'
            gutterBottom
            sx={{
              my: 2,
            }}
          >
            Menu {index + 1}
          </Typography>
          <Component
            handleSetData={(data) => {
              setFieldValue('menus', data);
            }}
            type={type}
            isLoadingData={isLoadingMenuData || isFetchingRestaurantData}
            isEditing={Boolean(isEditing)}
            valuesData={values}
            key={`menu-${index}`}
            uuid={uuid}
            onRemove={removeComponent}
          />
        </>
      ))}

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <Button
            variant='outlined'
            color='primary'
            onClick={addComponent}
            endIcon={<IconPlus />}
          >
            Agregar menu
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default MenuControlNormal;
