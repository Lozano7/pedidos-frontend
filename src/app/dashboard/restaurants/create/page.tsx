'use client';
import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import RestaurantFrom from '../components/forms/RestaurantFrom';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Crear restaurante'
      subtitle='En esta sección puedes crear un restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <RestaurantFrom />
      </Box>
    </SimplePage>
  );
};

export default page;
