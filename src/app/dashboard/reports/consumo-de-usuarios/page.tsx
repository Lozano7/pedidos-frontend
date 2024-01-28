'use client';
import SimplePage from '@/components/sample-page/page';
import { LocalizationWrapper } from '@/components/shared/LocalizationWrapper';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import {
  setMenuTableLimit,
  setMenuTablePage,
  setMenuTableSearch,
} from '@/store/features/menu/menuSlice';
import {
  DashboardConsumptionData,
  IReportDashboardConsumptionData,
} from '@/store/features/report/interfaces/consumption.interface';
import {
  useGetDataDashboardConsumptionQuery,
  useGetDownloadAllClientDataExelMutation,
  useGetDownloadExelMutation,
  useLazyGetDataDashboardConsumptionQuery,
} from '@/store/features/report/reportApiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Autocomplete,
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { IconBookDownload } from '@tabler/icons-react';
import dayjs from 'dayjs';
import download from 'downloadjs';
import { useEffect, useState } from 'react';
import MenuReportConsumption from '../components/MenuReportConsumption';

const roles = [
  {
    value: 'COLLABORATOR',
    label: 'Colaborador',
  },
  {
    value: 'INTER',
    label: 'Pasante',
  },
];

const Page = () => {
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(dayjs(new Date()));
  const [role, setRole] = useState('COLLABORATOR');

  const [downloadTrigger, setDownloadTrigger] = useState(0);

  const [data, setData] = useState<IReportDashboardConsumptionData | null>(
    null
  );

  const dispatch = useAppDispatch();

  const { menuTable, menuForType } = useAppSelector(
    (state) => state.menuReducer
  );

  const {
    data: reportConsumptionData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetDataDashboardConsumptionQuery({
    page: menuTable.page,
    limit: menuTable.limit,
    search: menuTable.search,
    startDate: startDate.format('MM/DD/YYYY'),
    endDate: endDate.format('MM/DD/YYYY'),
    roles: role,
  });

  const [
    getAllDataDashboardConsumption,
    { data: dataDashboardConsumtion, isLoading: isFetchingAll },
  ] = useLazyGetDataDashboardConsumptionQuery();

  const [
    getExel,
    {
      isLoading: isDownloading,
      isSuccess: isDownloadSuccess,
      isError: isErrorDownload,
      error: errorDownload,
      reset: resetDownload,
    },
  ] = useGetDownloadExelMutation();

  const [
    getAllClientExel,
    {
      isLoading: isDownloadingAll,
      isSuccess: isDownloadAllSuccess,
      isError: isErrorDownloadAll,
      error: errorDownloadAll,
      reset: resetDownloadAll,
    },
  ] = useGetDownloadAllClientDataExelMutation();

  const handleDownload = async (data: DashboardConsumptionData) => {
    const exelBase64 = await getExel(data).unwrap();

    // Decodificar la cadena en base64
    const binaryString = atob(exelBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Crear un Blob a partir del ArrayBuffer
    const blob = new Blob([bytes.buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Descargar el Blob
    download(blob, `${data.name}-reporte-consumo.xlsx`);
  };

  const handleDownloadAll = async () => {
    await getAllDataDashboardConsumption({
      startDate: startDate.format('MM/DD/YYYY'),
      endDate: endDate.format('MM/DD/YYYY'),
      roles: role,
      all: true,
    }).unwrap();
  };

  useEffect(() => {
    if (reportConsumptionData && !Array.isArray(reportConsumptionData)) {
      setData(reportConsumptionData);
    }
  }, [reportConsumptionData]);

  useEffect(() => {
    if (dataDashboardConsumtion && Array.isArray(dataDashboardConsumtion)) {
      console.log('Entra en el if');
      const execute = async () => {
        const exelBase64 = await getAllClientExel(
          dataDashboardConsumtion
        ).unwrap();

        // Decodificar la cadena en base64
        const binaryString = atob(exelBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Crear un Blob a partir del ArrayBuffer
        const blob = new Blob([bytes.buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Descargar el Blob
        download(
          blob,
          `Reporte - ${startDate.format('MM-DD-YYYY')} - ${endDate.format(
            'MM-DD-YYYY'
          )} .xlsx`
        );
      };
      execute();
    } else {
      console.log('Entra en el else');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDashboardConsumtion, downloadTrigger]);

  return (
    <SimplePage
      title='Consumo de usuarios'
      subtitle='En esta sección puedes ver el consumo de los usuarios y descargar los reportes'
    >
      <>
        {
          //a continuacion los filtro de las fechas de inicio y fin ademas del rol
        }
        <Grid
          container
          spacing={2}
          sx={{
            my: 3,
          }}
        >
          <Grid item xs={5}>
            <InputLabel>Fecha Inicio</InputLabel>
            <LocalizationWrapper>
              <DatePicker
                sx={{
                  width: '100%',
                }}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue as any);
                }}
              />
            </LocalizationWrapper>
          </Grid>

          <Grid item xs={5}>
            <InputLabel>Fecha Fin</InputLabel>
            <LocalizationWrapper>
              <DatePicker
                sx={{
                  width: '100%',
                }}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue as any);
                }}
              />
            </LocalizationWrapper>
          </Grid>
          <Grid item xs={2}>
            <InputLabel>Rol</InputLabel>
            <Autocomplete
              options={roles}
              getOptionLabel={(option) => option.label}
              onChange={(event, value) => {
                setRole(value?.value || '');
              }}
              value={roles.find((rol) => rol.value === role) || null}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </Grid>
        </Grid>

        <SearchPaginatedTable
          data={
            data
              ? [...(data?.data || [])].reverse()?.map((row, idx) => {
                  return {
                    number: menuTable.limit * (menuTable.page - 1) + idx + 1,
                    identification: row.clientId,
                    name: row.name,
                    roles: `${row.roles?.join(', ')}`,
                    options: row,
                  };
                }) || []
              : []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            identification: 'Identificación',
            name: 'Nombre',
            roles: 'Roles',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.identification)}
          page={menuTable.page}
          perPage={menuTable.limit}
          search={menuTable.search}
          searchPlacehoder='Buscar por nombre o identificación'
          setPage={(page: number) => {
            dispatch(setMenuTablePage(page));
          }}
          setPerPage={
            (limit: number) => {
              dispatch(setMenuTableLimit(limit));
            }
            // setSize
          }
          setSearch={
            (search: string) => {
              dispatch(setMenuTableSearch(search));
            }
            // setSearch
          }
          total={Number(
            !Array.isArray(reportConsumptionData)
              ? reportConsumptionData?.total
              : 0
          )}
          numHeader={6}
          isCollapsible
          CollapsibleItems={data?.data?.map((pedido) => (
            <MenuReportConsumption key={pedido.clientId} data={pedido} />
          ))}
          customDataCellsProperties={{
            number: {
              align: 'center',
            },
            identification: {
              align: 'center',
            },
            name: {
              align: 'center',
            },
            roles: {
              align: 'center',
            },
          }}
          customRenderers={{
            options: ({ options }) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <Button
                    onClick={() => {
                      handleDownload(options);
                    }}
                  >
                    <IconBookDownload />
                  </Button>
                </Stack>
              );
            },
          }}
          ActionButtons={
            <Button
              disabled={isDownloadingAll || isFetchingAll}
              variant='contained'
              startIcon={<IconBookDownload />}
              onClick={() => {
                setDownloadTrigger(downloadTrigger + 1);
                handleDownloadAll();
              }}
            >
              Descargar todo
            </Button>
          }
        />
      </>
    </SimplePage>
  );
};

export default Page;
