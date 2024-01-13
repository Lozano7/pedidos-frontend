import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import DrinkFrom from '../components/DrinkFrom';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Registrar Bebida'
      subtitle='En esta sección puedes registrar una bebida en el restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <DrinkFrom />
      </Box>
    </SimplePage>
  );
};

export default page;
