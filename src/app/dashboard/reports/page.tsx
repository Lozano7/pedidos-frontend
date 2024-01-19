'use client';

import { IReportDashboardData } from '@/store/features/report/interfaces/report.interface';
import { useGetDataDashboardQuery } from '@/store/features/report/reportApiSlice';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  IconClipboardText,
  IconPremiumRights,
  IconSalad,
  IconSoup,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import NumericalData from '../components/dashboard/NumericalData';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import YearlyBreakup from '../components/dashboard/YearlyBreakup';

const Page = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;
  const [dataDashboard, setDataDashboard] = useState<IReportDashboardData>({
    totalPedidos: '',
    totalValor: '',
    restaurant: {
      restaurantId: '',
      name: '',
      price: 0,
      count: 0,
    },
    cantidadDieta: '',
    cantidadNormal: '',
    cantidadUsuarios: '',
    collaborators: 0,
    interns: 0,
    latestUsers: [],
  });

  const { data, isFetching } = useGetDataDashboardQuery();

  useEffect(() => {
    if (data) {
      setDataDashboard({
        totalPedidos: data.totalPedidos,
        totalValor: data.totalValor,
        restaurant: {
          restaurantId: data?.restaurant?.restaurantId || '',
          name: data?.restaurant?.name || '',
          price: data?.restaurant?.price || 0,
          count: data?.restaurant?.count || 0,
        },
        cantidadDieta: data.cantidadDieta,
        cantidadNormal: data.cantidadNormal,
        cantidadUsuarios: data.cantidadUsuarios,
        collaborators: data.collaborators,
        interns: data.interns,
        latestUsers: data.latestUsers,
      });
    }
  }, [data]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <NumericalData
                isLoading={isFetching}
                title='Total de pedidos'
                value={`${data?.totalPedidos || ''}`}
                Icon={() => <IconClipboardText size={24} />}
                isIndicador
                isIndicatorUp
                subtitle='Pedidos realizados'
              />
            </Grid>
            <Grid item xs={12}>
              <NumericalData
                isLoading={isFetching}
                title='Pedidos Normales'
                value={`${data?.cantidadNormal || ''}`}
                Icon={() => <IconSoup size={24} />}
                isIndicador
                isIndicatorUp={
                  Number(dataDashboard?.cantidadNormal) >
                  Number(dataDashboard?.cantidadDieta)
                    ? true
                    : false
                }
                isIndicatorDown={
                  Number(dataDashboard?.cantidadDieta) >
                  Number(dataDashboard?.cantidadNormal)
                    ? true
                    : false
                }
                subtitle={
                  Number(dataDashboard?.cantidadNormal) >
                  Number(dataDashboard?.cantidadDieta)
                    ? 'Más pedidos normales'
                    : 'Menos pedidos normales'
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <NumericalData
                isLoading={isFetching}
                title='Total valor a pagar'
                value={`$${dataDashboard.totalValor}`}
                Icon={() => <IconPremiumRights size={24} />}
                isIndicador
                isIndicatorUp
                subtitle='Valor total a pagar'
              />
            </Grid>
            <Grid item xs={12}>
              <NumericalData
                isLoading={isFetching}
                title='Pedidos de Dieta'
                value={`${data?.cantidadDieta}`}
                Icon={() => <IconSalad size={24} />}
                isIndicador
                isIndicatorUp={
                  Number(dataDashboard.cantidadDieta) >
                  Number(dataDashboard?.cantidadNormal)
                    ? true
                    : false
                }
                isIndicatorDown={
                  Number(dataDashboard?.cantidadNormal) >
                  Number(dataDashboard.cantidadDieta)
                    ? true
                    : false
                }
                subtitle={
                  Number(dataDashboard.cantidadDieta) >
                  Number(dataDashboard?.cantidadNormal)
                    ? 'Más pedidos de dieta'
                    : 'Menos pedidos de dieta'
                }
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <NumericalData
                isLoading={isFetching}
                title={`${dataDashboard.restaurant.name}`}
                value={`$${dataDashboard.restaurant.price}`}
                Icon={() => <IconSalad size={24} />}
                isSubtileNormal
                subtitle='Restaurante con más pedidos'
              />
            </Grid>
            <Grid item xs={12}>
              <YearlyBreakup
                title='Usuarios'
                value={`${dataDashboard.cantidadUsuarios}`}
                subtitle='Colaboradores e Internos'
                labels={[
                  {
                    label: 'Colaboradores',
                    color: primary,
                  },
                  {
                    label: 'Internos',
                    color: primarylight,
                  },
                ]}
                series={[dataDashboard.collaborators, dataDashboard.interns]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <RecentTransactions
            data={dataDashboard.latestUsers}
            title='Ultimos usuarios creados'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
