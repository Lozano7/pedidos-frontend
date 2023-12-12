import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';

const page = () => {
  return (
    <SimplePage
      title='Crear usuario'
      subtitle='En esta sección puedes crear un usuario'
    >
      <Box sx={{ mt: 3 }}></Box>
    </SimplePage>
  );
};

export default page;
