import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerDB } from "../firebase/auth";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials, thunkAPI) => {
    const response = await registerDB(credentials);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    console.log(credentials);
    const response = await loginDB(credentials);
    console.log(response.data);
    return response.data;
  }
);
