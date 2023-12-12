import { mainApi } from '../../../api/mainApi';
import { middlewareApi } from '../../../middleware';
import {
  IUserCreateRequest,
  IUserCreateResponse,
  IUserResponse,
} from './interfaces/user-response.interface';

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
    addUser: builder.mutation<IUserCreateResponse, IUserCreateRequest>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IUserCreateResponse>(
            'users',
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

export const { useGetUsersQuery, useAddUserMutation } = userApi;
