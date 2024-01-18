import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
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
  }),
});

export const { useGetDataDashboardQuery } = reportApi;
