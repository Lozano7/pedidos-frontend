export interface IMenu {
  data: MenuData[];
  total: number;
  page: number;
  limit: number;
}

export interface MenuData {
  _id: string;
  date: string;
  menus: Menu[];
  restaurantId: string;
  __v: number;
}

export interface Menu {
  type: string;
  soup: string;
  second: string;
  drink: string;
  price: string;
  dessert: string;
}

export interface IMenuPayload {
  date: string;
  menus: Menu[];
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantStartOrderTime: string;
  restaurantEndOrderTime: string;
  restaurantDeliveryTime: string;
}
