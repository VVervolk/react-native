import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentOnPost,
  addNewPost,
  getPosts,
  logOutUser,
  loginUser,
  registerUser,
} from "./operations";

const initialState = {
  user: { name: "", email: "" },
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.login;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.user.name = action.payload.login;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state = initialState;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addCommentOnPost.fulfilled, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
