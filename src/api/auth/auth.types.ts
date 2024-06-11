export type LoginReq = {
  email: string;
  password: string;
};

export type RegisterReq = {
  email: string;
  password: string;
  name: string;
};

export type Token = {
  token: string;
  username: string;
};

export interface IUser {
  name: string;
  email: string;
  customer_id: string;
  avatar: string;
  is_admin: boolean;
}
