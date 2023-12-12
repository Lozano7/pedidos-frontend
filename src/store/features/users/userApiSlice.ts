import { mainApi } from '../../../api/mainApi';
import { middlewareApi } from '../../../middleware';
import {
  IUserCreateRequest,
  IUserCreateResponse,
  IUserEditRequest,
  IUserEditResponse,
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
    editUser: builder.mutation<IUserEditResponse, IUserEditRequest>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.patch<IUserEditResponse>(
            `users/${body.identification}`,
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    deleteUser: builder.mutation<{ message: string }, { id: string | number }>({
      queryFn: async ({ id }) => {
        try {
          console.log('Id a eliminar', id);
          const { data } = await mainApi.delete<{ message: string }>(
            `users/${id}`
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
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
