import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import SecondFrom from '../components/SecondFrom';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Registrar Segundo'
      subtitle='En esta sección puedes registrar un segundo en el restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <SecondFrom />
      </Box>
    </SimplePage>
  );
};

export default page;
