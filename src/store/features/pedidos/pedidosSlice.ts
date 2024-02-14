import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PedidoData } from './interfaces/pedidos.interface';

interface PedidosState {
  pedidosRestaurantTable: {
    page: number;
    limit: number;
    search: string;
  };
  pedidosRestaurantSelect: PedidoData | null;
}

const pedido: PedidosState = {
  pedidosRestaurantTable: {
    page: 1,
    limit: 10,
    search: '',
  },
  pedidosRestaurantSelect: null,
};

const pedidoSlice = createSlice({
  initialState: pedido,
  name: 'pedido',
  reducers: {
    setPedidosRestaurantTablePage(state, action: PayloadAction<number>) {
      state.pedidosRestaurantTable.page = action.payload;
    },
    setPedidosRestaurantTableLimit(state, action: PayloadAction<number>) {
      state.pedidosRestaurantTable.limit = action.payload;
    },
    setPedidosRestaurantTableSearch(state, action: PayloadAction<string>) {
      state.pedidosRestaurantTable.search = action.payload;
    },
    setPedidosRestaurantSelect(state, action: PayloadAction<PedidoData>) {
      state.pedidosRestaurantSelect = action.payload;
    },
  },
});

export const {
  setPedidosRestaurantTablePage,
  setPedidosRestaurantTableLimit,
  setPedidosRestaurantTableSearch,
  setPedidosRestaurantSelect,
} = pedidoSlice.actions;

export default pedidoSlice.reducer;
