'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { IPedidosResponse } from '@/store/features/pedidos/interfaces/pedidos.interface';
import {
  useGetPedidosQuery,
  useUpdateStatusPedidoMutation,
} from '@/store/features/pedidos/pedidosApiSlice';
import {
  setSoupsTableLimit,
  setSoupsTablePage,
  setSoupsTableSearch,
} from '@/store/features/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { IconShare3 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MenuPedido from './components/MenuPedido';

const Page = () => {
  const [pedidosData, setPedidosData] = useState<IPedidosResponse | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const { pedidosRestaurantTable, pedidosRestaurantSelect } = useAppSelector(
    (state) => state.pedidoReducer
  );

  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetPedidosQuery({
      page: pedidosRestaurantTable.page,
      limit: pedidosRestaurantTable.limit,
      search: pedidosRestaurantTable.search,
      restaurantId:
        typeof window !== 'undefined'
          ? localStorage.getItem('restaurantId') || ''
          : '',
      date: dayjs(new Date()).format('MM/DD/YYYY'),
    });

  const [
    updateStatusPedido,
    {
      isLoading: isLoadingUpdateStatusPedido,
      isSuccess: isEditSucces,
      error: errorEdit,
      isError: isErrorEdit,
    },
  ] = useUpdateStatusPedidoMutation();

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
        <SearchPaginatedTable
          data={
            pedidosData?.data?.map((pedido, index) => ({
              number:
                pedidosRestaurantTable.limit *
                  (pedidosRestaurantTable.page - 1) +
                index +
                1,
              id: `${pedido.clientId}`,
              name: `${pedido.nameClient}`,
              date: `${pedido.date}`,
              type: pedido.typeMenu === 'N' ? 'Normal' : 'Dieta',
              price: `$ ${pedido.price}`,
              status: pedido.status,
              options: pedido,
            })) || []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            id: 'Id cliente',
            name: 'Nombre de cliente',
            date: 'Fecha',
            type: 'Tipo de menu',
            price: 'Precio',
            status: 'Estado',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.id)}
          page={pedidosRestaurantTable.page}
          perPage={pedidosRestaurantTable.limit}
          search={pedidosRestaurantTable.search}
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
            (search: string) => {
              dispatch(setSoupsTableSearch(search));
            }
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
            name: {
              align: 'center',
            },
            type: {
              align: 'center',
            },
            date: {
              align: 'center',
            },
            price: {
              align: 'center',
            },
            status: {
              align: 'center',
            },
            options: {
              align: 'center',
            },
          }}
          isCollapsible
          CollapsibleItems={pedidosData?.data?.map((pedido) => (
            <MenuPedido
              key={pedido.clientId}
              data={{
                soup: pedido.soup,
                second: pedido.second,
                drink: pedido.drink,
                dessert: pedido.dessert,
              }}
            />
          ))}
          customRenderers={{
            options: ({ options }) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <Tooltip title='Despachar'>
                    <IconButton
                      sx={{
                        color: '#556cd6',
                      }}
                      
                    >
                      <IconShare3 />
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
          }}
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
