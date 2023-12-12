export interface RolesResponse {
  data: RolesData[];
  total: number;
  page: number;
  limit: number;
}

export interface RolesData {
  _id: string;
  name: string;
  keyword: string;
  description: string;
  __v: number;
}
