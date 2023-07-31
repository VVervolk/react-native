import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOut, loginDB, registerDB } from "../firebase/auth";
import { addPost, getPosts } from "../firebase/firestore";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials, thunkAPI) => {
    const response = await registerDB(credentials);
    const data = {
      email: response.email,
      login: response.displayName || "Anonim",
    };
    return data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    const response = await loginDB(credentials);
    const data = {
      email: response.email,
      login: response.displayName || "Anonim",
    };
    return data;
  }
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (_, thunkAPI) => {
    const response = await logOut();
  }
);

export const addNewPost = createAsyncThunk(
  "user/addNewPost",
  async (data, thunkAPI) => {
    console.log(data);
    const response = await addPost(data);
    const post = { ...data.state, id: response };

    return post;
  }
);

export const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (email, thunkAPI) => {
    const response = await getPosts(email);

    return response;
  }
);
