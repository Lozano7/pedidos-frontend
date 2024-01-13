'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import EditButton from '@/components/shared/buttons/EditButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { ISecondResponse } from '@/store/features/restaurants/interfaces/restaurant-response.interface';
import {
  useDeleteSecondMutation,
  useGetSecondsQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
  setSecondSelected,
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
  const [secondsData, setSecondsData] = useState<ISecondResponse | null>(null);

  const { secondsTable, secondSelected } = useAppSelector(
    (state) => state.restaurantsReducer
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetSecondsQuery({
      page: secondsTable.page,
      limit: secondsTable.limit,
      search: secondsTable.search,
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
  ] = useDeleteSecondMutation();

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setSecondsData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Administrar segundos'
      subtitle='En esta sección puedes administrar los segundos registradas en el restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <SearchPaginatedTable
          data={
            secondsData?.data?.map((restaurant, index) => ({
              number: secondsTable.limit * (secondsTable.page - 1) + index + 1,
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
          page={secondsTable.page}
          perPage={secondsTable.limit}
          search={secondsTable.search}
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
          total={Number(secondsData?.total || 0)}
          numHeader={11}
          ActionButtons={
            <Button
              variant='contained'
              startIcon={<IconPlus />}
              onClick={() => {
                router.push('/dashboard/restaurants/seconds/create');
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
                        `/dashboard/restaurants/seconds/${options.name
                          .split(' ')
                          .join('-')}/${options.restaurantId}`
                      );
                    }}
                  />
                  <DeleteButton
                    onClick={async () => {
                      await dispatch(setSecondSelected(options));
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
            if (secondSelected) {
              try {
                await deleteData({
                  name: secondSelected.name.split(' ').join('-'),
                  type: secondSelected.type,
                  restaurantId: secondSelected.restaurantId,
                }).unwrap();
              } catch (error) {
                resetDelete();
              }
            }
          }}
          title='Eliminar Segundos'
          subtitle='¿Estás seguro de que quieres eliminar este segundo?'
          successMessage='Segundo eliminado correctamente'
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
