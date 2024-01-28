export interface IReportDashboardConsumptionData {
  data: DashboardConsumptionData[];
  total: number;
  page: number;
  limit: number;
}

export interface DashboardConsumptionData {
  name: string;
  clientId: string;
  roles: string[];
  pedidos: Pedido[];
}

export interface Pedido {
  _id: string;
  restaurantId: string;
  clientId: string;
  nameClient: string;
  date: string;
  typeMenu: string;
  soup: string;
  second: string;
  drink: string;
  dessert: string;
  price: number;
  __v: number;
  nameRestaurant: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPedidoMenu {
  soup: string;
  second: string;
  drink: string;
  dessert: string;
}
