'use client';
import SimplePage from '@/components/sample-page/page';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { useGetMenusQuery } from '@/store/features/menu/menuApiSlice';
import {
  setMenuTableLimit,
  setMenuTablePage,
  setMenuTableSearch,
} from '@/store/features/menu/menuSlice';
import {
  useAddPedidoMutation,
  useLazyGetIsExistPedidoQuery,
} from '@/store/features/pedidos/pedidosApiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MenuCollapseTable from '../restaurants/administrar-menu/components/MenuCollapseTable';
import { IMenuResponseList } from '../restaurants/administrar-menu/interfaces/menu.interface';

const Page = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<IMenuResponseList | null>(null);

  const { menuTable, menuForType } = useAppSelector(
    (state) => state.menuReducer
  );

  const { user } = useAppSelector((state) => state.authReducer);

  const [
    getIsExistPedido,
    { data: isExistPedidoData, isFetching: isFetchingIsExistPedido },
  ] = useLazyGetIsExistPedidoQuery();

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
    search: menuTable.search,
    date: dayjs().format('MM/DD/YYYY'),
  });

  const [
    addPedido,
    {
      isLoading: isLoadingAddPedido,
      isSuccess: isAddPedidoSuccess,
      isError: isErrorAddPedido,
      error: errorAddPedido,
      reset: resetAddPedido,
    },
  ] = useAddPedidoMutation();

  useEffect(() => {
    if (menusData && !Array.isArray(menusData)) {
      setData(menusData);
    }
  }, [menusData]);

  useEffect(() => {
    getIsExistPedido({
      clientId:
        user?.identification ||
        localStorage.getItem('pedidos-user-identification') ||
        '',
      restaurantId:
        user?.restaurantId || localStorage.getItem('restaurantId') || '',
      date: dayjs().format('MM-DD-YYYY'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SimplePage
      title='Menú del dia'
      subtitle='En esta sección puedes seleccionar el menú del día.'
    >
      {isFetchingIsExistPedido ? (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <CircularProgress
              sx={{
                color: 'primary.main',
              }}
            />
          </Box>
        </>
      ) : (
        <>
          {(isAddPedidoSuccess || isExistPedidoData) &&
          !isFetchingIsExistPedido ? (
            <Typography
              variant='h5'
              sx={{
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 'bold',
                mt: 5,
              }}
            >
              Ya tienes un pedido confirmado para hoy
            </Typography>
          ) : (
            <>
              <SearchPaginatedTable
                data={
                  data
                    ? [...(data?.data || [])].reverse()?.map((row, idx) => {
                        return {
                          number:
                            menuTable.limit * (menuTable.page - 1) + idx + 1,
                          name: row.restaurantName,
                          date: row.date,
                          status: dayjs(row.date).isBefore(
                            dayjs().startOf('day')
                          )
                            ? 'Inactivo'
                            : 'Activo',
                        };
                      }) || []
                    : []
                }
                error={isError ? String((error as any).errorMessage) : ''}
                headers={{
                  number: 'N°',
                  name: 'Restaurante',
                  date: 'Fecha',
                  status: 'Estado',
                }}
                isFetching={isFetching}
                isLoading={isLoading}
                keyExtractor={(row) => String(row.date)}
                page={menuTable.page}
                perPage={menuTable.limit}
                search={menuTable.search}
                searchPlacehoder='Buscar por la fecha del menú'
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
                showFilter={false}
                total={Number(!Array.isArray(menusData) ? menusData?.total : 0)}
                numHeader={6}
                isCollapsible
                CollapsibleItems={data?.data?.map((menus) => (
                  <MenuCollapseTable
                    key={menus?.date}
                    data={menus}
                    handleIsViewDialog={() => {
                      setOpenDialog(true);
                    }}
                  />
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
                }}
              />
              <ConfirmDialog
                open={openDialog}
                onClose={async () => {
                  setOpenDialog(false);
                  await resetAddPedido();
                  await refetch();
                }}
                onAccept={async () => {
                  if (menuForType) {
                    try {
                      await addPedido({
                        nameClient:
                          user?.name ||
                          localStorage.getItem('pedidos-user-name') ||
                          '',
                        clientId:
                          user?.identification ||
                          localStorage.getItem('pedidos-user-identification') ||
                          '',
                        restaurantId:
                          user?.restaurantId ||
                          localStorage.getItem('restaurantId') ||
                          '',
                        nameRestaurant: menuForType.restaurantName || '',
                        date: dayjs().format('MM/DD/YYYY'),
                        dessert: menuForType.dessert,
                        drink: menuForType.drink,
                        price: menuForType.price,
                        second: menuForType.second,
                        soup: menuForType.soup,
                        typeMenu: menuForType.type,
                      }).unwrap();
                    } catch (error) {
                      resetAddPedido();
                    }
                  }
                }}
                title='Confirmar pedido'
                subtitle='¿Estás seguro de que quieres confirmar este pedido?'
                successMessage='Pedido confirmado exitosamente'
                isSuccess={isAddPedidoSuccess}
                errorMessage={String(
                  (errorAddPedido as any)?.response?.data?.message
                )}
                loading={isLoadingAddPedido}
                iserror={isErrorAddPedido}
              />
            </>
          )}
        </>
      )}
    </SimplePage>
  );
};

export default Page;
