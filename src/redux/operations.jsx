import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOut, loginDB, registerDB } from "../firebase/auth";
import { addComment, addPost, getPostsFetch } from "../firebase/firestore";

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
    const response = await addPost(data);

    return { id: response, ...data };
  }
);

export const getPosts = createAsyncThunk(
  "user/getPosts",
  async (_, thunkAPI) => {
    const response = await getPostsFetch();

    return response;
  }
);
export const addCommentOnPost = createAsyncThunk(
  "user/addCommentOnPost",
  async (data, thunkAPI) => {
    const response = await addComment(data);
  }
);
