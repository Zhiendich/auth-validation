import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import axios from "axios";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        `${process.env.REACT_APP_API_URL_USER}/getUsers`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось получить пользователей");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/edit",
  async (
    newData: {
      id: string;
      fullName?: string;
      login?: string;
    },
    thunkAPI
  ) => {
    const { id } = newData;
    try {
      const response = await axios.put<IUser>(
        `${process.env.REACT_APP_API_URL_USER}/edit/${id}`,
        { newData }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Не удалось обновить пользователя");
    }
  }
);
