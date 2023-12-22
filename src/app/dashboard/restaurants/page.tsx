'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import EditButton from '@/components/shared/buttons/EditButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { IRestaurantsResponse } from '@/store/features/restaurants/interfaces/restaurant-response.interface';
import {
  useDeleteRestaurantMutation,
  useGetRestaurantsQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
  setRestaurantSelected,
  setRestaurantsTableLimit,
  setRestaurantsTablePage,
  setRestaurantsTableSearch,
} from '@/store/features/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, Chip, Stack } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [restaurantsData, setRestaurantsData] =
    useState<IRestaurantsResponse | null>(null);
  const { restaurantsTable, restaurantSelected } = useAppSelector(
    (state) => state.restaurantsReducer
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetRestaurantsQuery({
      page: restaurantsTable.page,
      limit: restaurantsTable.limit,
      search: restaurantsTable.search,
    });

  const [
    deleteUser,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
      error: errorDelete,
      reset: resetDelete,
    },
  ] = useDeleteRestaurantMutation();

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setRestaurantsData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Administrar restaurantes'
      subtitle='En esta sección puedes administrar los restaurantes de la plataforma'
    >
      <Box sx={{ mt: 3 }}>
        <SearchPaginatedTable
          data={
            restaurantsData?.data?.map((restaurant, index) => ({
              number:
                restaurantsTable.limit * (restaurantsTable.page - 1) +
                index +
                1,
              name: `${restaurant.name}`,
              ruc: restaurant.ruc,
              address: restaurant.address,
              phone: restaurant.phone,
              adminName: restaurant.adminName,
              startOrderTime: restaurant.startOrderTime,
              endOrderTime: restaurant.endOrderTime,
              deliveryTime: restaurant.deliveryTime,
              status: restaurant.status,
              options: restaurant,
            })) || []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            name: 'Nombre',
            ruc: 'RUC',
            address: 'Dirección',
            phone: 'Teléfono',
            adminName: 'Nombre del administrador',
            startOrderTime: 'Hora de inicio de pedidos',
            endOrderTime: 'Hora de fin de pedidos',
            deliveryTime: 'Tiempo de entrega',
            status: 'Estado',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.ruc)}
          page={restaurantsTable.page}
          perPage={restaurantsTable.limit}
          search={restaurantsTable.search}
          searchPlacehoder='Buscar por su número de identificación'
          setPage={(page: number) => {
            dispatch(setRestaurantsTablePage(page));
          }}
          setPerPage={
            (limit: number) => {
              dispatch(setRestaurantsTableLimit(limit));
            }
            // setSize
          }
          setSearch={
            (search: string) => {
              dispatch(setRestaurantsTableSearch(search));
            }
            // setSearch
          }
          total={Number(restaurantsData?.total || 0)}
          numHeader={6}
          ActionButtons={
            <Button
              variant='contained'
              startIcon={<IconPlus />}
              onClick={() => {
                router.push('/dashboard/restaurants/create');
              }}
            >
              Agregar
            </Button>
          }
          customDataCellsProperties={{
            number: {
              align: 'center',
            },
            name: {
              align: 'center',
            },
            ruc: {
              align: 'center',
            },
            address: {
              align: 'center',
            },
            phone: {
              align: 'center',
            },
            adminName: {
              align: 'center',
            },
            startOrderTime: {
              align: 'center',
            },
            endOrderTime: {
              align: 'center',
            },
            deliveryTime: {
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
            status: ({ status }) => {
              return (
                <Stack
                  direction='row'
                  spacing={1}
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Chip label={status} color='primary' variant='outlined' />
                </Stack>
              );
            },
            options: ({ options }) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <EditButton
                    onClick={() => {
                      dispatch(setRestaurantSelected(options));
                      router.push(`/dashboard/restaurants/${options.ruc}`);
                    }}
                  />
                  <DeleteButton
                    onClick={async () => {
                      console.log;
                      await dispatch(setRestaurantSelected(options));
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
            if (restaurantSelected) {
              try {
                await deleteUser({
                  ruc: '',
                }).unwrap();
              } catch (error) {
                resetDelete();
              }
            }
          }}
          title='Eliminar restaurante'
          subtitle='¿Estás seguro de que quieres eliminar este restaurante?'
          successMessage='Restaurante eliminado correctamente'
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
