import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import {
  IDataMenu,
  IDataMenuPayload,
  IRestaurant,
  IRestaurantsPayload,
  IRestaurantsResponse,
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
        console.log('Desde el apislice');
        console.log(name, restaurantId);
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
          >('restaurants/seconds', {
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

    getDrinks: builder.query<
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
          >('restaurants/drinks', {
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

    getDesserts: builder.query<
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
          >('restaurants/desserts', {
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

    addSecond: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IRestaurant>(
            'restaurants/seconds',
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addDrink: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IRestaurant>(
            'restaurants/drinks',
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    addDessert: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<IRestaurant>(
            'restaurants/desserts',
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    editSoup: builder.mutation<IDataMenu, IDataMenuPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.patch<IDataMenu>(
            `soup/${body.name}`,
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),

    editSecond: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.patch<IRestaurant>(
            `restaurants/seconds/${body.name}`,
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    editDrink: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.patch<IRestaurant>(
            `restaurants/drinks/${body.name}`,
            body
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    editDessert: builder.mutation<IRestaurant, IRestaurantsPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.patch<IRestaurant>(
            `restaurants/desserts/${body.name}`,
            body
          );
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
    deleteSecond: builder.mutation<
      { message: string },
      { id: string | number }
    >({
      queryFn: async ({ id }) => {
        try {
          const { data } = await mainApi.delete<{ message: string }>(
            `restaurants/seconds/${id}`
          );
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    deleteDrink: builder.mutation<{ message: string }, { id: string | number }>(
      {
        queryFn: async ({ id }) => {
          try {
            const { data } = await mainApi.delete<{ message: string }>(
              `restaurants/drinks/${id}`
            );
            return { data };
          } catch (error: any) {
            console.log(error);
            return { error };
          }
        },
      }
    ),
    deleteDessert: builder.mutation<
      { message: string },
      { id: string | number }
    >({
      queryFn: async ({ id }) => {
        try {
          const { data } = await mainApi.delete<{ message: string }>(
            `restaurants/desserts/${id}`
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
