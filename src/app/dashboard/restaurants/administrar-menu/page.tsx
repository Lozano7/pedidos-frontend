'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import { LocalizationWrapper } from '@/components/shared/LocalizationWrapper';
import DeleteButton from '@/components/shared/buttons/DeleteButton';
import EditButton from '@/components/shared/buttons/EditButton';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import {
  useDeleteMenuMutation,
  useGetMenusQuery,
} from '@/store/features/menu/menuApiSlice';
import {
  setMenuSelected,
  setMenuTableLimit,
  setMenuTablePage,
  setMenuTableSearch,
} from '@/store/features/menu/menuSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Button, Chip, InputLabel, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuCollapseTable from './components/MenuCollapseTable';
import { IMenuResponseList } from './interfaces/menu.interface';

const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<IMenuResponseList | null>(null);
  const { menuTable, menuSelected } = useAppSelector(
    (state) => state.menuReducer
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    data: menusData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetMenusQuery({
    page: menuTable.page,
    limit: menuTable.limit,
    search: menuTable.search
      ? dayjs(menuTable.search).format('MM/DD/YYYY')
      : '',
    restaurantId:
      typeof window !== 'undefined'
        ? localStorage.getItem('restaurantId') || ''
        : '',
  });

  const [
    deleteMenu,
    {
      isLoading: isDeleting,
      isSuccess: isDeleteSuccess,
      isError: isErrorDelete,
      error: errorDelete,
      reset: resetDelete,
    },
  ] = useDeleteMenuMutation();

  useEffect(() => {
    if (menusData && !Array.isArray(menusData)) {
      setData(menusData);
    }
  }, [menusData]);

  return (
    <SimplePage
      title='Administrar menú'
      subtitle='En esta sección puedes visualizar, editar y eliminar los menús de tu restaurante.'
    >
      <>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mb: 2,
            }}
          >
            <Button
              variant='outlined'
              startIcon={<IconPlus />}
              onClick={() => {
                router.push('/dashboard/restaurants/administrar-menu/create');
              }}
            >
              Agregar
            </Button>
          </Box>
          <Box>
            <InputLabel>Filtre por fecha</InputLabel>
            <LocalizationWrapper>
              <DatePicker
                value={menuTable.search || null}
                //eslint-disable-next-line
                onChange={(newValue) => {
                  dispatch(setMenuTableSearch(newValue || ''));
                }}
              />
            </LocalizationWrapper>
          </Box>
        </Box>
        <SearchPaginatedTable
          data={
            data
              ? [...(data?.data || [])].reverse()?.map((row, idx) => {
                  return {
                    number: menuTable.limit * (menuTable.page - 1) + idx + 1,
                    date: row.date,
                    status: dayjs(row.date).isBefore(dayjs().startOf('day'))
                      ? 'Inactivo'
                      : 'Activo',
                    options: row,
                  };
                }) || []
              : []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            date: 'Fecha',

            status: 'Estado',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.date)}
          page={menuTable.page}
          perPage={menuTable.limit}
          search=''
          searchPlacehoder=''
          showFilter={false}
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
            () => {}
            // setSearch
          }
          total={Number(!Array.isArray(menusData) ? menusData?.total : 0)}
          numHeader={6}
          isCollapsible
          CollapsibleItems={data?.data?.map((menus) => (
            <MenuCollapseTable key={menus?.date} data={menus} />
          ))}
          customDataCellsProperties={{
            number: {
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
                  <Chip
                    label={status}
                    color={status === 'Activo' ? 'success' : 'error'}
                    variant='outlined'
                  />
                </Stack>
              );
            },
            options: ({ options }) => {
              return (
                <Stack direction='row' spacing={1} justifyContent='center'>
                  <EditButton
                    // disabled={dayjs(options.date).isBefore(
                    //   dayjs().startOf('day')
                    // )}
                    onClick={() => {
                      dispatch(setMenuSelected(options));
                      router.push(
                        `/dashboard/restaurants/administrar-menu/${options.date
                          .split('/')
                          .join('-')}`
                      );
                    }}
                  />
                  <DeleteButton
                    // disabled={dayjs(options.date).isBefore(
                    //   dayjs().startOf('day')
                    // )}
                    onClick={async () => {
                      await dispatch(setMenuSelected(options));
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
            if (menuSelected) {
              try {
                await deleteMenu({
                  fecha: menuSelected.date.split('/').join('-'),
                  restaurantId:
                    typeof window !== 'undefined'
                      ? localStorage.getItem('restaurantId') || ''
                      : '',
                }).unwrap();
              } catch (error) {
                resetDelete();
              }
            }
          }}
          title='Eliminar menú'
          subtitle='¿Estás seguro de que quieres eliminar este menú?'
          successMessage='Menú eliminado correctamente'
          isSuccess={isDeleteSuccess}
          errorMessage={String((errorDelete as any)?.response?.data?.message)}
          loading={isDeleting}
          iserror={isErrorDelete}
        />
      </>
    </SimplePage>
  );
};

export default Page;
