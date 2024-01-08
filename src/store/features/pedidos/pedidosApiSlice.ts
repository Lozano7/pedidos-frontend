import { mainApi } from '@/api/mainApi';
import { middlewareApi } from '@/middleware';
import { IPedidoPayload, PedidoData } from './interfaces/pedidos.interface';

export const pedidoApi = middlewareApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useAddPedidoMutation, useLazyGetIsExistPedidoQuery } = pedidoApi;
