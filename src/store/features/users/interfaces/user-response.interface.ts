export interface IUserResponse {
  data: UserData[];
  total: number;
  page: number;
  limit: number;
}

export interface UserData {
  _id: string;
  email: string;
  identification: string;
  password: string;
  name: string;
  lastName: string;
  roles: string[];
  __v: number;
}

export interface IUserCreateResponse {
  email: string;
  roles: string[];
  fullName: string;
  name: string;
  lastName: string;
  identification: string;
}

export interface IUserCreateRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
  identification: string;
  roles: string[];
}
