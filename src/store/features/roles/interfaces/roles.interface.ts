export interface RolesResponse {
  data: Datum[];
  total: number;
  page: number;
  limit: number;
}

export interface Datum {
  _id: string;
  name: string;
  keyword: string;
  description: string;
  __v: number;
}
