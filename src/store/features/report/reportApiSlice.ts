import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import { IReportDashboardConsumptionData } from './interfaces/consumption.interface';
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
      }
    >({
      queryFn: async ({ limit, page, search, all, startDate, endDate }) => {
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
  }),
});

export const { useGetDataDashboardQuery, useGetDataDashboardConsumptionQuery } =
  reportApi;
