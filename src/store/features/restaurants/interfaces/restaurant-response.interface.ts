export interface IRestaurantsResponse {
  data: IRestaurant[];
  total: number;
  page: number;
  limit: number;
}

export interface IRestaurant {
  _id: string;
  name: string;
  ruc: string;
  adminName: string;
  address: string;
  status: string;
  phone: string;
  startOrderTime: string;
  endOrderTime: string;
  deliveryTime: string;
  __v: number;
}

export interface IRestaurantsPayload {
  name: string;
  ruc: string;
  adminName: string;
  address: string;
  status: string;
  phone: string;
  startOrderTime: string;
  endOrderTime: string;
  deliveryTime: string;
}
