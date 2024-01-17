import { Box, Grid } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import MonthlyEarnings from '../components/dashboard/MonthlyEarnings';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import SalesOverview from '../components/dashboard/SalesOverview';
import YearlyBreakup from '../components/dashboard/YearlyBreakup';

const page = () => {
  return (
    <PageContainer title='Reportes' description='Este es el reporte del dia'>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default page;
