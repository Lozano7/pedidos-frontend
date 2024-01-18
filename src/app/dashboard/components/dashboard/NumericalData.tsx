import {
  Avatar,
  CircularProgress,
  Fab,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  IconArrowDownRight,
  IconArrowUpRight,
  TablerIconsProps,
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import DashboardCard from '../shared/DashboardCard';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  title: string;
  Icon: (props: TablerIconsProps) => JSX.Element;
  value: string | number | undefined;
  isSubtileNormal?: boolean;
  isIndicador?: boolean;
  isIndicatorUp?: boolean;
  isIndicatorDown?: boolean;
  subtitle?: string;
  isLoading?: boolean;
}

const NumericalData = ({
  title,
  Icon,
  value,
  isIndicador,
  isIndicatorDown,
  isIndicatorUp,
  isSubtileNormal,
  subtitle,
  isLoading,
}: Props) => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart: any = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title={title}
      action={
        Icon && (
          <Fab color='secondary' size='medium' sx={{ color: '#ffffff' }}>
            <Icon />
          </Fab>
        )
      }
    >
      <>
        {isLoading ? (
          <CircularProgress
            size={20}
            thickness={5}
            sx={{ color: theme.palette.primary.main }}
          />
        ) : (
          <>
            <Typography variant='h3' fontWeight='700' mt='-20px'>
              {value}
            </Typography>
            {isIndicador && (
              <Stack direction='row' spacing={1} my={1} alignItems='center'>
                <Avatar
                  sx={{
                    bgcolor: isIndicatorUp ? secondarylight : errorlight,
                    width: 27,
                    height: 27,
                  }}
                >
                  {isIndicatorUp && (
                    <IconArrowUpRight width={20} color='#39B69A' />
                  )}
                  {isIndicatorDown && (
                    <IconArrowDownRight width={20} color='#F64E60' />
                  )}
                </Avatar>
                <Typography variant='subtitle2' color='textSecondary'>
                  {subtitle}
                </Typography>
              </Stack>
            )}
            {isSubtileNormal && (
              <Typography variant='subtitle2' color='textSecondary'>
                {subtitle}
              </Typography>
            )}
          </>
        )}
      </>
    </DashboardCard>
  );
};

export default NumericalData;
