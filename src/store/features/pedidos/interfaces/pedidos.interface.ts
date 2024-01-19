export interface IPedidosResponse {
  data: PedidoData[];
  total: number;
  page: number;
  limit: number;
}

export interface PedidoData {
  _id: string;
  nameClient: string;
  nameRestaurant: string;
  restaurantId: string;
  clientId: string;
  date: string;
  typeMenu: string;
  soup: string;
  second: string;
  drink: string;
  dessert: string;
  price: number;
  __v: number;
}

export interface IPedidoPayload {
  nameClient: string;
  restaurantId: string;
  nameRestaurant: string;
  clientId: string;
  date: string;
  typeMenu: string;
  soup: string;
  second: string;
  drink: string;
  dessert: string;
  price: number | string;
  roles: string[];
}
