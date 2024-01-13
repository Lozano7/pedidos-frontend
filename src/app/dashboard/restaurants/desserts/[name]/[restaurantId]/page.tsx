import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import DessertForm from '../../components/DessertForm';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Editar Postre'
      subtitle='En esta sección puedes editar una postre del restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <DessertForm />
      </Box>
    </SimplePage>
  );
};

export default page;
