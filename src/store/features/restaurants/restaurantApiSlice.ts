import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import {
  IDataMenu,
  IDataMenuPayload,
  IDessertResponse,
  IDrinkResponse,
  IRestaurant,
  IRestaurantsPayload,
  IRestaurantsResponse,
  ISecondResponse,
  ISoupResponse,
} from './interfaces/restaurant-response.interface';

export const restaurantApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<
      IRestaurantsResponse | IRestaurant[],
      {
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
      }
    >({
      queryFn: async ({ limit, page, search, all }) => {
        try {
          const { data } = await mainApi.get<
            IRestaurantsResponse | IRestaurant[]
          >('restaurants', {
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

    getRestaurantByRuc: builder.query<IRestaurant, { ruc: string }>({
      queryFn: async ({ ruc }) => {
        try {
          const { data } = await mainApi.get<IRestaurant>(`restaurants/${ruc}`);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addRestaurant: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IRestaurant>('restaurants', body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    editRestaurant: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.patch<IRestaurant>(
            `restaurants/${body.ruc}`,
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    deleteRestaurant: builder.mutation<
      { message: string },
      { ruc: string | number }
    >({
      queryFn: async ({ ruc }) => {
        try {
          const { data } = await mainApi.delete<{ message: string }>(
            `restaurants/${ruc}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    getSoups: builder.query<
      ISoupResponse | IDataMenu[],
      {
        restaurantId?: string;
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
      }
    >({
      queryFn: async ({ limit, page, search, all, restaurantId }) => {
        try {
          const { data } = await mainApi.get<ISoupResponse | IDataMenu[]>(
            'soup',
            {
              params: {
                restaurantId,
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

    getSoupByNameByRestaurantId: builder.query<
      IDataMenu,
      { name: string; restaurantId: string }
    >({
      queryFn: async ({ name, restaurantId }) => {
        try {
          const { data } = await mainApi.get<IDataMenu>(
            `soup/${name}/${restaurantId}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    getSeconds: builder.query<
      ISecondResponse | IDataMenu[],
      {
        restaurantId?: string;
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
      }
    >({
      queryFn: async ({ limit, page, search, all, restaurantId }) => {
        try {
          const { data } = await mainApi.get<ISecondResponse | IDataMenu[]>(
            'second',
            {
              params: {
                limit,
                page,
                search,
                all,
                restaurantId,
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

    getSecondByNameByRestaurantId: builder.query<
      IDataMenu,
      { name: string; restaurantId: string }
    >({
      queryFn: async ({ name, restaurantId }) => {
        try {
          const { data } = await mainApi.get<IDataMenu>(
            `second/${name}/${restaurantId}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    getDrinks: builder.query<
      IDrinkResponse | IDataMenu[],
      {
        restaurantId?: string;
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
      }
    >({
      queryFn: async ({ limit, page, search, all, restaurantId }) => {
        try {
          const { data } = await mainApi.get<IDrinkResponse | IDataMenu[]>(
            'drink',
            {
              params: {
                limit,
                page,
                search,
                all,
                restaurantId,
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

    getDrinkByNameByRestaurantId: builder.query<
      IDataMenu,
      { name: string; restaurantId: string }
    >({
      queryFn: async ({ name, restaurantId }) => {
        try {
          const { data } = await mainApi.get<IDataMenu>(
            `drink/${name}/${restaurantId}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    getDesserts: builder.query<
      IDessertResponse | IDataMenu[],
      {
        restaurantId?: string;
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
      }
    >({
      queryFn: async ({ limit, page, search, all, restaurantId }) => {
        try {
          const { data } = await mainApi.get<IDessertResponse | IDataMenu[]>(
            'dessert',
            {
              params: {
                limit,
                page,
                search,
                all,
                restaurantId,
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

    getDessertByNameByRestaurantId: builder.query<
      IDataMenu,
      { name: string; restaurantId: string }
    >({
      queryFn: async ({ name, restaurantId }) => {
        try {
          const { data } = await mainApi.get<IDataMenu>(
            `dessert/${name}/${restaurantId}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addSoup: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IDataMenu>('soup', body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addSecond: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IDataMenu>('second', body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addDrink: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IDataMenu>('drink', body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addDessert: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IDataMenu>('dessert', body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    editSoup: builder.mutation<
      IDataMenu,
      {
        name: string;
        body: IDataMenuPayload;
      }
    >({
      queryFn: async ({ name, body }) => {
        try {
          const { data } = await mainApi.patch<IDataMenu>(`soup/${name}`, {
            name: body.name,
            type: body.type,
            restaurantId: body.restaurantId,
          });
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    editSecond: builder.mutation<
      IDataMenu,
      {
        name: string;
        body: IDataMenuPayload;
      }
    >({
      queryFn: async ({ name, body }) => {
        try {
          const { data } = await mainApi.patch<IDataMenu>(`second/${name}`, {
            name: body.name,
            type: body.type,
            restaurantId: body.restaurantId,
          });
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    editDrink: builder.mutation<
      IDataMenu,
      {
        name: string;
        body: IDataMenuPayload;
      }
    >({
      queryFn: async ({ name, body }) => {
        try {
          const { data } = await mainApi.patch<IDataMenu>(`drink/${name}`, {
            name: body.name,
            type: body.type,
            restaurantId: body.restaurantId,
          });
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    editDessert: builder.mutation<
      IDataMenu,
      {
        name: string;
        body: IDataMenuPayload;
      }
    >({
      queryFn: async ({ name, body }) => {
        try {
          const { data } = await mainApi.patch<IDataMenu>(`dessert/${name}`, {
            name: body.name,
            type: body.type,
            restaurantId: body.restaurantId,
          });
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    deleteSoup: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.delete<IDataMenu>(
            `soup/${body.name}/${body.restaurantId}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    deleteSecond: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.delete<IDataMenu>(
            `second/${body.name}/${body.restaurantId}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    deleteDrink: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.delete<IDataMenu>(
            `drink/${body.name}/${body.restaurantId}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    deleteDessert: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.delete<IDataMenu>(
            `dessert/${body.name}/${body.restaurantId}`
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
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
  useGetRestaurantByRucQuery,
  useLazyGetRestaurantByRucQuery,
  useAddRestaurantMutation,
  useEditRestaurantMutation,
  useDeleteRestaurantMutation,
  useGetSoupsQuery,
  useLazyGetSoupsQuery,
  useLazyGetSoupByNameByRestaurantIdQuery,
  useLazyGetDessertByNameByRestaurantIdQuery,
  useLazyGetDrinkByNameByRestaurantIdQuery,
  useLazyGetSecondByNameByRestaurantIdQuery,
  useGetSecondsQuery,
  useLazyGetSecondsQuery,
  useGetDrinksQuery,
  useLazyGetDrinksQuery,
  useGetDessertsQuery,
  useLazyGetDessertsQuery,
  useAddSoupMutation,
  useAddSecondMutation,
  useAddDrinkMutation,
  useAddDessertMutation,
  useEditSoupMutation,
  useEditSecondMutation,
  useEditDrinkMutation,
  useEditDessertMutation,
  useDeleteSoupMutation,
  useDeleteSecondMutation,
  useDeleteDrinkMutation,
  useDeleteDessertMutation,
} = restaurantApi;
