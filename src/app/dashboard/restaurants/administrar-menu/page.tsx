import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';

const page = () => {
  return (
    <SimplePage
      title='Menú del dia'
      subtitle='En esta sección puedes registrar las opciones del menú del dia'
    >
      <Box sx={{ mt: 3 }}>Hola</Box>
    </SimplePage>
  );
};

export default page;
