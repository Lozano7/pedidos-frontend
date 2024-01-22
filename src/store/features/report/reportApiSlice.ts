import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import {
  DashboardConsumptionData,
  IReportDashboardConsumptionData,
} from './interfaces/consumption.interface';
import { IReportDashboardData } from './interfaces/report.interface';

export const reportApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
    getDataDashboard: builder.query<IReportDashboardData, void>({
      queryFn: async () => {
        try {
          const { data } = await mainApi.get<IReportDashboardData>(
            'report/dashboard'
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    getDataDashboardConsumption: builder.query<
      IReportDashboardConsumptionData,
      {
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
        startDate?: string;
        endDate?: string;
        roles?: string;
      }
    >({
      queryFn: async ({
        limit,
        page,
        search,
        all,
        startDate,
        endDate,
        roles,
      }) => {
        try {
          const { data } = await mainApi.get<IReportDashboardConsumptionData>(
            'report/dashboard/consumption',
            {
              params: {
                limit,
                page,
                search,
                all,
                startDate,
                endDate,
                roles,
              },
            }
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    getDownloadExel: builder.mutation<string, DashboardConsumptionData>({
      queryFn: async ({ name, pedidos }) => {
        try {
          const { data } = await mainApi.post<any>(
            'report/dashboard/generate-exel',
            {
              name,
              pedidos,
            }
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    getDownloadAllClientDataExel: builder.mutation<
      string,
      DashboardConsumptionData[]
    >({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<any>(
            'report/dashboard/generate-exel/all-clients',
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetDataDashboardQuery,
  useGetDataDashboardConsumptionQuery,
  useLazyGetDataDashboardConsumptionQuery,
  useGetDownloadExelMutation,
  useGetDownloadAllClientDataExelMutation,
} = reportApi;
