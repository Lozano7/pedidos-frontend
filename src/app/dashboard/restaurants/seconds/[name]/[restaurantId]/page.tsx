import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import SecondFrom from '../../components/SecondFrom';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Editar Segundo'
      subtitle='En esta sección puedes editar un segundo del restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <SecondFrom />
      </Box>
    </SimplePage>
  );
};

export default page;
