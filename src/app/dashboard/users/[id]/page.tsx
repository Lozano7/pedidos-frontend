'use client';
import SimplePage from '@/components/sample-page/page';
import { Box } from '@mui/material';
import React from 'react';
import UsersForm from '../components/form/UsersForm';

const page = () => {
  return (
    <SimplePage
      isBack={true}
      title='Editar usuario'
      subtitle='En esta sección puedes editar un usuario'
    >
      <Box sx={{ mt: 3 }}>
        <UsersForm />
      </Box>
    </SimplePage>
  );
};

export default page;
