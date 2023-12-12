import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import { RolesData, RolesResponse } from './interfaces/roles.interface';

export const rolesApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<
      RolesResponse | RolesData[],
      {
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
      }
    >({
      queryFn: async ({ limit, page, search, all }) => {
        try {
          const { data } = await mainApi.get<RolesResponse | RolesData[]>(
            'roles',
            {
              params: {
                limit,
                page,
                search,
                all,
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

export const { useGetRolesQuery } = rolesApi;
