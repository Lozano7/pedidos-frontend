export interface IMenu {
  type: 'N' | 'D';
  soup: string;
  second: string;
  drink: string;
  price: string;
  dessert: string;
  restaurantName?: string;
  restaurantId?: string;
  uuid?: string;
}

export interface IMenuResponseList {
  data: MenuResponseData[];
  total: number;
  page: null;
  limit: null;
}

export interface MenuResponseData {
  _id: string;
  date: string;
  menus: IMenu[];
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantStartOrderTime: string;
  restaurantEndOrderTime: string;
  restaurantDeliveryTime: string;
  __v: number;
}
