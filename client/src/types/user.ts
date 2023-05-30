export type IUser = {
  _id: string;
  login: string;
  password: string;
  fullName: string;
};

export type IUserData = {
  user: IUser;
  token: string;
};

export type IUserState = {
  user: IUser | null;
  isLoading: boolean;
  isError: string | null;
  isSuccess?: boolean;
  registerError?: string | null;
};

export type IUsersState = {
  users: IUser[] | null;
  isUsersLoading: boolean;
  isUsersError: string | null;
};
