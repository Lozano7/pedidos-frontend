'use client';
import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import Image from 'next/image';
import img from '../../../public/images/dashboard/dashboard-image.svg';
import PageContainer from './components/container/PageContainer';

const page = () => {
  return (
    <PageContainer title='Dashboard' description='This is dashboard page'>
      <SimplePage
        title='Bienvenido al panel de administración'
        subtitle='En esta sección puedes realizar las tareas de administración de la plataforma'
      >
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Image
            src={img}
            alt='Universidad de Guayaquil'
            width={400}
            height={400}
          />
        </Box>
      </SimplePage>
    </PageContainer>
  );
};

export default page;
