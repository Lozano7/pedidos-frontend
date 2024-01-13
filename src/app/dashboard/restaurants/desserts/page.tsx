'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import EditButton from '@/components/shared/buttons/EditButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { IDessertResponse } from '@/store/features/restaurants/interfaces/restaurant-response.interface';
import {
  useDeleteDessertMutation,
  useGetDessertsQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
  setDessertSelected,
  setSoupSelected,
  setSoupsTableLimit,
  setSoupsTablePage,
  setSoupsTableSearch,
} from '@/store/features/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, Stack } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dessertsData, setDessertsData] = useState<IDessertResponse | null>(
    null
  );

  const { dessertsTable, dessertSelected } = useAppSelector(
    (state) => state.restaurantsReducer
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetDessertsQuery({
      page: dessertsTable.page,
      limit: dessertsTable.limit,
      search: dessertsTable.search,
      restaurantId:
        typeof window !== 'undefined'
          ? localStorage.getItem('restaurantId') || ''
          : '',
    });

  const [
    deleteData,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
      error: errorDelete,
      reset: resetDelete,
    },
  ] = useDeleteDessertMutation();

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setDessertsData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Administrar Postres'
      subtitle='En esta sección puedes administrar los postres registrados en el restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <SearchPaginatedTable
          data={
            dessertsData?.data?.map((restaurant, index) => ({
              number:
                dessertsTable.limit * (dessertsTable.page - 1) + index + 1,
              name: `${restaurant.name}`,
              type: restaurant.type === 'N' ? 'Normal' : 'Dieta',
              options: restaurant,
            })) || []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            name: 'Nombre',
            type: 'Tipo',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.name)}
          page={dessertsTable.page}
          perPage={dessertsTable.limit}
          search={dessertsTable.search}
          searchPlacehoder='Buscar por su nombre'
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
          total={Number(dessertsData?.total || 0)}
          numHeader={11}
          ActionButtons={
            <Button
              variant='contained'
              startIcon={<IconPlus />}
              onClick={() => {
                router.push('/dashboard/restaurants/desserts/create');
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
            type: {
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
                  <EditButton
                    onClick={() => {
                      dispatch(setSoupSelected(options));
                      router.push(
                        `/dashboard/restaurants/desserts/${options.name
                          .split(' ')
                          .join('-')}/${options.restaurantId}`
                      );
                    }}
                  />
                  <DeleteButton
                    onClick={async () => {
                      console.log;
                      await dispatch(setDessertSelected(options));
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
            if (dessertSelected) {
              try {
                await deleteData({
                  name: dessertSelected.name.split(' ').join('-'),
                  type: dessertSelected.type,
                  restaurantId: dessertSelected.restaurantId,
                }).unwrap();
              } catch (error) {
                resetDelete();
              }
            }
          }}
          title='Eliminar postres'
          subtitle='¿Estás seguro de que quieres eliminar este postre?'
          successMessage='Postre eliminado correctamente'
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
