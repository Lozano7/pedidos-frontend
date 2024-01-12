import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import SoupFrom from '../components/SoupFrom';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Registrar Sopa'
      subtitle='En esta sección puedes registrar una sopa'
    >
      <Box sx={{ mt: 3 }}>
        <SoupFrom />
      </Box>
    </SimplePage>
  );
};

export default page;
