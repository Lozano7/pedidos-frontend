'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import EditButton from '@/components/shared/buttons/EditButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { ISoupResponse } from '@/store/features/restaurants/interfaces/restaurant-response.interface';
import {
  useDeleteSoupMutation,
  useGetSoupsQuery,
} from '@/store/features/restaurants/restaurantApiSlice';
import {
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
  const [soupsData, setSoupsData] = useState<ISoupResponse | null>(null);

  const { soupsTable, soupSelected } = useAppSelector(
    (state) => state.restaurantsReducer
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetSoupsQuery({
      page: soupsTable.page,
      limit: soupsTable.limit,
      search: soupsTable.search,
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
  ] = useDeleteSoupMutation();

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setSoupsData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Administrar sopas'
      subtitle='En esta sección puedes administrar las sopas registradas en el restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <Box
          mb={2}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant='outlined'
            startIcon={<IconPlus />}
            onClick={() => {
              router.push('/dashboard/restaurants/sopas/create');
            }}
          >
            Agregar
          </Button>
        </Box>
        <SearchPaginatedTable
          data={
            soupsData?.data?.map((restaurant, index) => ({
              number: soupsTable.limit * (soupsTable.page - 1) + index + 1,
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
          page={soupsTable.page}
          perPage={soupsTable.limit}
          search={soupsTable.search}
          searchPlacehoder='Buscar por su número de identificación'
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
          total={Number(soupsData?.total || 0)}
          numHeader={4}
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
                        `/dashboard/restaurants/sopas/${options.name
                          .split(' ')
                          .join('-')}/${options.restaurantId}`
                      );
                    }}
                  />
                  <DeleteButton
                    onClick={async () => {
                      console.log;
                      await dispatch(setSoupSelected(options));
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
            if (soupSelected) {
              try {
                await deleteData({
                  name: soupSelected.name.split(' ').join('-'),
                  type: soupSelected.type,
                  restaurantId: soupSelected.restaurantId,
                }).unwrap();
              } catch (error) {
                resetDelete();
              }
            }
          }}
          title='Eliminar sopa'
          subtitle='¿Estás seguro de que quieres eliminar esta sopa?'
          successMessage='Sopa eliminada correctamente'
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
