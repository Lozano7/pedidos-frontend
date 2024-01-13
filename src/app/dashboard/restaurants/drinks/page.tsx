'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import EditButton from '@/components/shared/buttons/EditButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { IDrinkResponse } from '@/store/features/restaurants/interfaces/restaurant-response.interface';
import {
  useDeleteDrinkMutation,
  useGetDrinksQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
  setDrinkSelected,
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
  const [drinksData, setDrinksData] = useState<IDrinkResponse | null>(null);

  const { drinksTable, drinkSelected } = useAppSelector(
    (state) => state.restaurantsReducer
  );

  //drinksTable, drinkSelected

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetDrinksQuery({
      page: drinksTable.page,
      limit: drinksTable.limit,
      search: drinksTable.search,
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
  ] = useDeleteDrinkMutation();

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setDrinksData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Administrar Bebidas'
      subtitle='En esta sección puedes administrar las bebidas registradas en el restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <SearchPaginatedTable
          data={
            drinksData?.data?.map((restaurant, index) => ({
              number: drinksTable.limit * (drinksTable.page - 1) + index + 1,
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
          page={drinksTable.page}
          perPage={drinksTable.limit}
          search={drinksTable.search}
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
          total={Number(drinksData?.total || 0)}
          numHeader={11}
          ActionButtons={
            <Button
              variant='contained'
              startIcon={<IconPlus />}
              onClick={() => {
                router.push('/dashboard/restaurants/drinks/create');
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
                        `/dashboard/restaurants/drinks/${options.name
                          .split(' ')
                          .join('-')}/${options.restaurantId}`
                      );
                    }}
                  />
                  <DeleteButton
                    onClick={async () => {
                      console.log;
                      await dispatch(setDrinkSelected(options));
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
            if (drinkSelected) {
              try {
                await deleteData({
                  name: drinkSelected.name.split(' ').join('-'),
                  type: drinkSelected.type,
                  restaurantId: drinkSelected.restaurantId,
                }).unwrap();
              } catch (error) {
                resetDelete();
              }
            }
          }}
          title='Eliminar Bebidas'
          subtitle='¿Estás seguro de que quieres eliminar esta bebida?'
          successMessage='Bebida eliminada correctamente'
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
