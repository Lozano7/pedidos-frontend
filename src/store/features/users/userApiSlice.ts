import { mainApi } from '../../../api/mainApi';
import { middlewareApi } from '../../../middleware';
import { IUserResponse } from './interfaces/user-response.interface';

export const userApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      IUserResponse,
      {
        page?: number;
        limit?: number;
        search?: string;
      }
    >({
      queryFn: async ({ limit, page, search }) => {
        try {
          const { data } = await mainApi.get<IUserResponse>('users', {
            params: {
              limit,
              page,
              search,
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

export const { useGetUsersQuery } = userApi;
