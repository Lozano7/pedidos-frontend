import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import { RolesResponse } from './interfaces/roles.interface';

export const rolesApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<
      RolesResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
      }
    >({
      queryFn: async ({ limit, page, search, all }) => {
        try {
          const { data } = await mainApi.get<RolesResponse>('roles', {
            params: {
              limit,
              page,
              search,
              all,
            },
          });
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
