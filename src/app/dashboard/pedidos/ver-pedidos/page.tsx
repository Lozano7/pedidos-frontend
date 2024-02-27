'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { LocalizationWrapper } from '@/components/shared/LocalizationWrapper';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import {
  IPedidosResponse,
  PedidoData,
} from '@/store/features/pedidos/interfaces/pedidos.interface';
import {
  useDeletePedidoMutation,
  useGetPedidosQuery,
} from '@/store/features/pedidos/pedidosApiSlice';
import {
  setSoupsTableLimit,
  setSoupsTablePage,
  setSoupsTableSearch,
} from '@/store/features/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, InputLabel, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [pedidosData, setPedidosData] = useState<IPedidosResponse | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pedidoSelected, setPedidoSelected] = useState<PedidoData | null>(null);

  const { soupsTable, soupSelected } = useAppSelector(
    (state) => state.restaurantsReducer
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetPedidosQuery({
      page: soupsTable.page,
      limit: soupsTable.limit,
      search: soupsTable.search
        ? dayjs(soupsTable.search).format('MM/DD/YYYY')
        : '',
      clientId:
        typeof window !== 'undefined'
          ? localStorage.getItem('pedidos-user-identification') || ''
          : '',
      date: dayjs().format('MM/DD/YYYY'),
    });

  const [
    deletePedido,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
      error: errorDelete,
      reset: resetDelete,
    },
  ] = useDeletePedidoMutation();

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setPedidosData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Pedidos'
      subtitle='En esta sección puedes ver los pedidos que has realizado.'
    >
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            mb: 2,
          }}
        >
          <InputLabel>Filtre por fecha</InputLabel>
          <LocalizationWrapper>
            <DatePicker
              value={soupsTable.search || null}
              //eslint-disable-next-line
              onChange={(newValue) => {
                dispatch(setSoupsTableSearch(newValue || ''));
              }}
            />
          </LocalizationWrapper>
        </Box>

        <SearchPaginatedTable
          data={
            pedidosData?.data?.map((pedido, index) => ({
              number: soupsTable.limit * (soupsTable.page - 1) + index + 1,
              name: `${pedido.nameRestaurant || ''}`,
              type: pedido.typeMenu === 'N' ? 'Normal' : 'Dieta',
              soup: pedido.soup,
              second: pedido.second,
              others: `Bebida: ${pedido.drink}, Postre: ${pedido.dessert}`,
              price: `$ ${pedido.price}`,
              options: pedido,
            })) || []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            name: 'Restaurante',
            type: 'Tipo de menu',
            soup: 'Sopa',
            second: 'Segundo',
            others: 'Otros',
            price: 'Precio',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.name)}
          page={soupsTable.page}
          perPage={soupsTable.limit}
          search=''
          searchPlacehoder='Buscar por fecha (mes/día/año)'
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
            name: {
              align: 'center',
            },
            type: {
              align: 'center',
            },
            soup: {
              align: 'center',
            },
            second: {
              align: 'center',
            },
            others: {
              align: 'center',
            },
            price: {
              align: 'center',
            },
          }}
          customRenderers={{
            options: ({ options }) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <DeleteButton
                    onClick={async () => {
                      setPedidoSelected(options);
                      setOpenDialog(true);
                    }}
                  />
                </Stack>
              );
            },
          }}
        />
        <ConfirmDialog
          open={openDialog}
          onClose={async () => {
            setOpenDialog(false);
            await resetDelete();
            await refetch();
          }}
          onAccept={async () => {
            if (pedidoSelected) {
              try {
                await deletePedido({
                  date: dayjs(pedidoSelected.date).format('MM-DD-YYYY'),
                  clientId: pedidoSelected.clientId,
                  restaurantId: pedidoSelected.restaurantId,
                }).unwrap();
              } catch (error) {
                resetDelete();
              }
            }
          }}
          title='Cancelar este Pedido'
          subtitle='¿Estás seguro de que quieres cancelar este pedido?'
          successMessage='Pedido cancelado correctamente'
          isSuccess={isDeleteSuccess}
          errorMessage={String((errorDelete as any)?.response?.data?.message)}
          loading={isDeleting}
          iserror={isErrorDelete}
        />
      </Box>
    </SimplePage>
  );
};

export default Page;
