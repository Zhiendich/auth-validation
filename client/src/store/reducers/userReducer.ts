import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserData, IUserState, IUsersState } from "../../types/user";
import { getUsers, updateUser } from "../actions/usersAction";

const initialState: IUsersState = {
  users: null,
  isUsersError: null,
  isUsersLoading: false,
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending.type]: (state) => {
      state.isUsersLoading = true;
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isUsersLoading = false;
      state.isUsersError = "";
      state.users = action.payload;
    },
    [getUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isUsersLoading = false;
      state.isUsersError = action.payload;
    },
    [updateUser.pending.type]: (state) => {
      state.isUsersLoading = true;
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isUsersLoading = false;
      state.isUsersError = "";
      state.users?.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isUsersLoading = false;
      state.isUsersError = action.payload;
    },
  },
});

export default userSlice.reducer;
