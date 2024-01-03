import { mainApi } from '@/api/mainApi';
import { IMenuResponseList } from '@/app/dashboard/restaurants/administrar-menu/interfaces/menu.interface';
import { middlewareApi } from '@/middleware';
import { IMenu, IMenuPayload, MenuData } from './interfaces/menu.interface';

export const menuApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenus: builder.query<
      IMenuResponseList | MenuData[],
      {
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
        date?: string;
      }
    >({
      queryFn: async ({ limit, page, search, all, date }) => {
        try {
          const { data } = await mainApi.get<IMenuResponseList | MenuData[]>(
            'menu',
            {
              params: {
                limit,
                page,
                search,
                all,
                date,
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

    getMenuByDate: builder.query<MenuData, { date: string }>({
      queryFn: async ({ date }) => {
        try {
          const { data } = await mainApi.get<MenuData>(`menu/${date}`);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addMenu: builder.mutation<IMenu, IMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IMenu>('menu', body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    updateMenu: builder.mutation<
      IMenu,
      {
        fecha: string;
        body: IMenuPayload;
      }
    >({
      queryFn: async ({ body, fecha }) => {
        try {
          const { data } = await mainApi.patch<IMenu>(`menu/${fecha}`, body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    deleteMenu: builder.mutation<IMenu, { fecha: string }>({
      queryFn: async ({ fecha }) => {
        try {
          const { data } = await mainApi.delete<IMenu>(`menu/${fecha}`);
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
  useGetMenusQuery,
  useLazyGetMenuByDateQuery,
  useAddMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
