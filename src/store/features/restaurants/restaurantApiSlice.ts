import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import {
  IRestaurant,
  IRestaurantsPayload,
  IRestaurantsResponse,
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
} = restaurantApi;
