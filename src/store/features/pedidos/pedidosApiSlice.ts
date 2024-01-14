import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import {
  IPedidoPayload,
  IPedidosResponse,
  PedidoData,
} from './interfaces/pedidos.interface';

export const pedidoApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
    getPedidos: builder.query<
      IPedidosResponse | PedidoData[],
      {
        page?: number;
        limit?: number;
        search?: string;
        all?: boolean;
        restaurantId?: string;
        clientId?: string;
      }
    >({
      queryFn: async ({ limit, page, search, all, restaurantId, clientId }) => {
        try {
          const { data } = await mainApi.get<IPedidosResponse | PedidoData[]>(
            'pedidos',
            {
              params: {
                limit,
                page,
                search,
                all,
                restaurantId,
                clientId,
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

    addPedido: builder.mutation<PedidoData, IPedidoPayload>({
      queryFn: async (body) => {
        try {
          const { data } = await mainApi.post<PedidoData>('pedidos', body);
          return { data };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
    getIsExistPedido: builder.query<
      boolean,
      {
        date: string;
        restaurantId: string;
        clientId: string;
      }
    >({
      queryFn: async ({ date, restaurantId, clientId }) => {
        try {
          const { data } = await mainApi.get<boolean>(
            `pedidos/${date}/${restaurantId}/${clientId}`
          );
          const isExist = Boolean(data);
          return { data: isExist };
        } catch (error: any) {
          console.log(error);
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetPedidosQuery,
  useAddPedidoMutation,
  useLazyGetIsExistPedidoQuery,
} = pedidoApi;
