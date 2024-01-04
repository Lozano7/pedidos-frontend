'use client';
import SimplePage from '@/components/sample-page/page';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import {
  useDeleteMenuMutation,
  useGetMenusQuery,
} from '@/store/features/menu/menuApiSlice';
import {
  setMenuTableLimit,
  setMenuTablePage,
  setMenuTableSearch,
} from '@/store/features/menu/menuSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Chip, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuCollapseTable from '../restaurants/administrar-menu/components/MenuCollapseTable';
import { IMenuResponseList } from '../restaurants/administrar-menu/interfaces/menu.interface';

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
    search: menuTable.search,
    date: dayjs().format('MM/DD/YYYY'),
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
      title='Menú del dia'
      subtitle='En esta sección puedes seleccionar el menú del día.'
    >
      <>
        <SearchPaginatedTable
          data={
            data
              ? [...(data?.data || [])].reverse()?.map((row, idx) => {
                  return {
                    number: menuTable.limit * (menuTable.page - 1) + idx + 1,
                    name: row.restaurantName,
                    date: row.date,
                    status: dayjs(row.date).isBefore(dayjs().startOf('day'))
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
      </>
    </SimplePage>
  );
};

export default Page;
