'use client';
import SimplePage from '@/components/sample-page/page';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import { IPedidosResponse } from '@/store/features/pedidos/interfaces/pedidos.interface';
import { useGetPedidosQuery } from '@/store/features/pedidos/pedidosApiSlice';
import {
  setSoupsTableLimit,
  setSoupsTablePage,
  setSoupsTableSearch,
} from '@/store/features/restaurants/restaurantSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const [pedidosData, setPedidosData] = useState<IPedidosResponse | null>(null);

  const { soupsTable, soupSelected } = useAppSelector(
    (state) => state.restaurantsReducer
  );

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } =
    useGetPedidosQuery({
      page: soupsTable.page,
      limit: soupsTable.limit,
      search: soupsTable.search,
      clientId:
        typeof window !== 'undefined'
          ? localStorage.getItem('pedidos-user-identification') || ''
          : '',
    });

  useEffect(() => {
    if (data && !Array.isArray(data)) {
      setPedidosData(data);
    }
  }, [data]);

  return (
    <SimplePage
      title='Pedidos'
      subtitle='En esta sección puedes ver los pedidos registrados en el restaurante'
    >
      <Box sx={{ mt: 3 }}>
        <SearchPaginatedTable
          data={
            pedidosData?.data?.map((pedido, index) => ({
              number: soupsTable.limit * (soupsTable.page - 1) + index + 1,
              name: `${pedido.nameClient}`,
              type: pedido.typeMenu === 'N' ? 'Normal' : 'Dieta',
              soup: pedido.soup,
              second: pedido.second,
              others: `Bebida: ${pedido.drink}, Postre: ${pedido.dessert}`,
              price: `$ ${pedido.price}`,
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
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.name)}
          page={soupsTable.page}
          perPage={soupsTable.limit}
          search={soupsTable.search}
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
        />
      </Box>
    </SimplePage>
  );
};

export default Page;
