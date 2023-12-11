'use client';

import PageContainer from '@/app/dashboard/components/container/PageContainer';
import LogoUg from '@/components/shared/LogoUg';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import AuthRegister from '../../../components/auth/AuthRegister';

const Register2 = () => (
  <PageContainer title='Register' description='this is Register page'>
    <Box
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.3',
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent='center'
        sx={{ height: '100vh' }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}
          >
            <Box display='flex' alignItems='center' justifyContent='center'>
              <LogoUg />
            </Box>
            <AuthRegister
              subtitle={
                <Stack
                  direction='row'
                  justifyContent='center'
                  spacing={1}
                  mt={3}
                >
                  <Typography
                    color='textSecondary'
                    variant='h6'
                    fontWeight='400'
                  >
                    ¿Ya tienes una cuenta?
                  </Typography>
                  <Typography
                    component={Link}
                    href='/auth/login'
                    fontWeight='500'
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Iniciar sesión
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register2;
