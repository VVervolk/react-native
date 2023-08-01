import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentOnPost,
  addNewPost,
  getUserPosts,
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
        state.user = initialState.user;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {})
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addCommentOnPost.fulfilled, (state, action) => {});
  },
});

export const userReducer = userSlice.reducer;
