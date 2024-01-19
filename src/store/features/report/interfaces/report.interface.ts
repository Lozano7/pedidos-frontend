export interface IReportDashboardData {
  totalPedidos: number | string;
  totalValor: number | string;
  restaurant: Restaurant;
  cantidadDieta: number | string;
  cantidadNormal: number | string;
  cantidadUsuarios: number | string;
  collaborators: number;
  interns: number;
  latestUsers: LatestUser[];
}

export interface LatestUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  identification: string;
  restaurantId: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Restaurant {
  restaurantId: string;
  name: string;
  price: number;
  count: number;
}
