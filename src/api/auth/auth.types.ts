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
