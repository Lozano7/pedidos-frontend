import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import DrinkFrom from '../../components/DrinkFrom';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Editar Bebida'
      subtitle='En esta sección puedes editar una bebida del restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <DrinkFrom />
      </Box>
    </SimplePage>
  );
};

export default page;
