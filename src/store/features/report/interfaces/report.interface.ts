export interface IReportDashboardData {
  totalPedidos: number | string;
  totalValor: number | string;
  restaurant: Restaurant;
  cantidadDieta: number | string;
  cantidadNormal: number | string;
  cantidadUsuarios: number | string;
  collaborators: number;
  interns: number;
}

export interface Restaurant {
  restaurantId: string;
  name: string;
  price: number;
  count: number;
}
