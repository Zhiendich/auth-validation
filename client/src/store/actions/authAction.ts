import axios from "axios";
import { IUser, IUserData } from "../../types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData: { password: string; login: string }, thunkAPI) => {
    try {
      const { login, password } = loginData;
      const response = await axios.post<IUserData>(
        `${process.env.REACT_APP_API_URL_AUTH}/login`,
        { login, password }
      );
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Неправильный логин или пароль");
    }
  }
);

export const registrationUser = createAsyncThunk(
  "user/registration",
  async (
    registerData: { password: string; login: string; fullName: string },
    thunkAPI
  ) => {
    try {
      const { login, password, fullName } = registerData;
      const response = await axios.post<IUser>(
        `${process.env.REACT_APP_API_URL_AUTH}/registration`,
        { login, password, fullName }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Пользователь с таким логином уже занят");
    }
  }
);

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await axios.get<IUserData>(
      `${process.env.REACT_APP_API_URL_AUTH}/getUser`,
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue("Неправильный логин или пароль");
  }
});
