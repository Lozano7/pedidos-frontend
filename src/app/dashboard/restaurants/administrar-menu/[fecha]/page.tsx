'use client';
import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const MenuWizzard = dynamic(() => import('../components/MenuWizzard'));

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Editar el menú del dia'
      subtitle='En esta sección puedes editar el menú del dia.'
    >
      <Box sx={{ mt: 3 }}>
        <MenuWizzard />
      </Box>
    </SimplePage>
  );
};

export default page;
