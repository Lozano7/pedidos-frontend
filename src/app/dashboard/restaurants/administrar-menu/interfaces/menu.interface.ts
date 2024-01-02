export interface IMenu {
  type: 'N' | 'D';
  soup: string;
  second: string;
  drink: string;
  price: string;
  dessert: string;
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
  __v: number;
}
