import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserData, IUserState } from "../../types/user";
import { loginUser, registrationUser, getUser } from "../actions/authAction";

const initialState: IUserState = {
  user: null,
  isError: null,
  isLoading: false,
  isSuccess: false,
  registerError: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<IUserData>) => {
      state.isLoading = false;
      state.isError = "";
      state.user = action.payload.user;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    [registrationUser.pending.type]: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [registrationUser.fulfilled.type]: (
      state,
      action: PayloadAction<IUserData>
    ) => {
      state.isLoading = false;
      state.isError = "";
      state.user = action.payload.user;
      state.isSuccess = true;
    },
    [registrationUser.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.registerError = action.payload;
      state.isSuccess = false;
    },
    [getUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.isError = "";
      state.user = action.payload;
    },
    [getUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
