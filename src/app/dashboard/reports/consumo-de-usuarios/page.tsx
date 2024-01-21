'use client';
import SimplePage from '@/components/sample-page/page';
import SearchPaginatedTable from '@/components/shared/tables/SearchPaginatedTable';
import {
  setMenuTableLimit,
  setMenuTablePage,
  setMenuTableSearch,
} from '@/store/features/menu/menuSlice';
import { IReportDashboardConsumptionData } from '@/store/features/report/interfaces/consumption.interface';
import { useGetDataDashboardConsumptionQuery } from '@/store/features/report/reportApiSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useState } from 'react';
import MenuReportConsumption from '../components/MenuReportConsumption';

const Page = () => {
  const [data, setData] = useState<IReportDashboardConsumptionData | null>(
    null
  );

  const dispatch = useAppDispatch();

  const { menuTable, menuForType } = useAppSelector(
    (state) => state.menuReducer
  );

  const { user } = useAppSelector((state) => state.authReducer);

  const {
    data: reportConsumptionData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetDataDashboardConsumptionQuery({
    page: menuTable.page,
    limit: menuTable.limit,
    search: menuTable.search,
  });

  useEffect(() => {
    if (reportConsumptionData && !Array.isArray(reportConsumptionData)) {
      setData(reportConsumptionData);
    }
  }, [reportConsumptionData]);

  return (
    <SimplePage
      title='Consumo de usuarios'
      subtitle='En esta sección puedes ver el consumo de los usuarios'
    >
      <>
        <SearchPaginatedTable
          data={
            data
              ? [...(data?.data || [])].reverse()?.map((row, idx) => {
                  return {
                    number: menuTable.limit * (menuTable.page - 1) + idx + 1,
                    identification: row.clientId,
                    name: row.name,
                    roles: `${row.roles?.join(', ')}`,
                    options: row,
                  };
                }) || []
              : []
          }
          error={isError ? String((error as any).errorMessage) : ''}
          headers={{
            number: 'N°',
            identification: 'Identificación',
            name: 'Nombre',
            roles: 'Roles',
            options: 'Opciones',
          }}
          isFetching={isFetching}
          isLoading={isLoading}
          keyExtractor={(row) => String(row.identification)}
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
          total={Number(
            !Array.isArray(reportConsumptionData)
              ? reportConsumptionData?.total
              : 0
          )}
          numHeader={6}
          isCollapsible
          CollapsibleItems={data?.data?.map((pedido) => (
            <MenuReportConsumption key={pedido.clientId} data={pedido} />
          ))}
          customDataCellsProperties={{
            number: {
              align: 'center',
            },
            identification: {
              align: 'center',
            },
            name: {
              align: 'center',
            },
            roles: {
              align: 'center',
            },
          }}
        />
      </>
    </SimplePage>
  );
};

export default Page;
