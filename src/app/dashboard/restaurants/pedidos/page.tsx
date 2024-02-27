'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { LocalizationWrapper } from '@/components/shared/LocalizationWrapper';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { IPedidosResponse } from '@/store/features/pedidos/interfaces/pedidos.interface';
import {
  useGetPedidosQuery,
  useUpdateStatusPedidoMutation,
} from '@/store/features/pedidos/pedidosApiSlice';
import {
  setNotificacionPedidos,
  setPedidosRestaurantSelect,
  setPedidosRestaurantTableSearch,
} from '@/store/features/pedidos/pedidosSlice';
import {
  setSoupsTableLimit,
  setSoupsTablePage,
} from '@/store/features/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Snackbar,
  Stack,
  Tooltip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { IconCheckbox } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const Page = () => {
  const { notificacionPedidos } = useAppSelector(
    (state) => state.pedidoReducer
  );

  const [pedidosData, setPedidosData] = useState<IPedidosResponse | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleUpdateTable = () => {
    setOpen(false);
    dispatch(setNotificacionPedidos([]));
    refetch();
  };

  const { pedidosRestaurantTable, pedidosRestaurantSelect } = useAppSelector(
    (state) => state.pedidoReducer
  );

  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetPedidosQuery(
      {
        page: pedidosRestaurantTable.page,
        limit: pedidosRestaurantTable.limit,
        search: pedidosRestaurantTable.search
          ? dayjs(pedidosRestaurantTable.search).format('MM/DD/YYYY')
          : '',
        restaurantId:
          typeof window !== 'undefined'
            ? localStorage.getItem('restaurantId') || ''
            : '',
        date: dayjs(new Date()).format('MM/DD/YYYY'),
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const [
    updateStatusPedido,
    {
      isLoading: isLoadingUpdateStatusPedido,
      isSuccess: isEditSucces,
      error: errorEdit,
      isError: isErrorEdit,
    },
  ] = useUpdateStatusPedidoMutation();

  const action = (
    <>
      <Button color='secondary' size='small' onClick={handleUpdateTable}>
        Actualizar
      </Button>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleUpdateTable}
      >
        <Close fontSize='small' />
      </IconButton>
    </>
  );

  useEffect(() => {
    if (notificacionPedidos.length > 0) {
      if (!open) setOpen(true);
    } else {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [notificacionPedidos]);

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setPedidosData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Pedidos'
      subtitle='En esta sección puedes ver los pedidos registrados en el restaurante el dia de hoy.'
    >
      <Box sx={{ mt: 3 }}>
        <Box>
          <InputLabel>Filtre por fecha</InputLabel>
          <LocalizationWrapper>
            <DatePicker
              value={pedidosRestaurantTable.search || null}
              //eslint-disable-next-line
              onChange={(newValue) => {
                dispatch(setPedidosRestaurantTableSearch(newValue || ''));
              }}
            />
          </LocalizationWrapper>
        </Box>

        <SearchPaginatedTable
          data={
            pedidosData?.data?.map((pedido, index) => ({
              number:
                pedidosRestaurantTable.limit *
                  (pedidosRestaurantTable.page - 1) +
                index +
                1,
              id: `${pedido.nameClient} - ${pedido.clientId}`,
              date: `${pedido.date}`,
              menu: pedido,
              status: pedido.status,
              options: pedido,
            })) || []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            id: 'Cliente',
            date: 'Fecha',
            menu: 'Menú',
            status: 'Estado',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.id)}
          page={pedidosRestaurantTable.page}
          perPage={pedidosRestaurantTable.limit}
          search=''
          showFilter={false}
          searchPlacehoder='Buscar por fecha (mes/día/año) o por su tipo de menu'
          setPage={(page: number) => {
            dispatch(setSoupsTablePage(page));
          }}
          setPerPage={
            (limit: number) => {
              dispatch(setSoupsTableLimit(limit));
            }
            // setSize
          }
          setSearch={
            (search: string) => {}
            // setSearch
          }
          total={Number(pedidosData?.total || 0)}
          numHeader={11}
          customDataCellsProperties={{
            number: {
              align: 'center',
            },
            id: {
              align: 'center',
            },
            date: {
              align: 'center',
            },
            status: {
              align: 'center',
            },
            options: {
              align: 'center',
            },
          }}
          customRenderers={{
            options: ({ options }) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <Tooltip title='Despachar'>
                    <IconButton
                      sx={{
                        color: '#556cd6',
                      }}
                      disabled={options.status === 'Despachado'}
                      onClick={() => {
                        setOpenDialog(true);
                        dispatch(setPedidosRestaurantSelect(options));
                      }}
                    >
                      <IconCheckbox />
                    </IconButton>
                  </Tooltip>
                </Stack>
              );
            },
            status: ({ status }) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <span
                    style={{
                      color: status === 'Pendiente' ? 'red' : 'green',
                    }}
                  >
                    {status}
                  </span>
                </Stack>
              );
            },
            menu: ({ menu }) => {
              return (
                <Stack
                  direction='column'
                  spacing={1}
                  justifyContent='center'
                  alignItems='center'
                >
                  <Box>
                    Tipo de menú:{' '}
                    <strong>{menu.typeMenu ? 'Normal' : 'Dieta'}</strong>
                  </Box>
                  <Box>
                    Sopa: <strong> {menu.soup}</strong>{' '}
                  </Box>
                  <Box>
                    Segundo: <strong>{menu.second}</strong>{' '}
                  </Box>
                  <Box>
                    Postre: <strong>{menu.dessert}</strong>{' '}
                  </Box>
                  <Box>
                    Bebida: <strong>{menu.drink}</strong>{' '}
                  </Box>
                  <Box>
                    Precio: <strong>${menu.price}</strong>{' '}
                  </Box>
                </Stack>
              );
            },
          }}
        />
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={handleClose}
          message='Nuevo pedido recibido'
          action={action}
        />
        <ConfirmDialog
          open={openDialog}
          onClose={async () => {
            setOpenDialog(false);
            await refetch();
          }}
          onAccept={async () => {
            if (pedidosRestaurantSelect) {
              try {
                await updateStatusPedido({
                  dataPayload: pedidosRestaurantSelect,
                  status: 'Despachado',
                }).unwrap();
              } catch (error) {
                console.log('Error al editar el pedido: ', error);
              }
            }
          }}
          title='Despachar pedido'
          subtitle='¿Estás seguro de que quieres despachar este pedido?'
          successMessage='Pedido despachado exitosamente'
          isSuccess={isEditSucces}
          errorMessage={String((errorEdit as any)?.response?.data?.message)}
          loading={isLoadingUpdateStatusPedido}
          iserror={isErrorEdit}
        />
      </Box>
    </SimplePage>
  );
};

export default Page;
