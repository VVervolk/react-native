import { createSlice } from "@reduxjs/toolkit";
import {
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
        console.log("register Slice", action.payload);
        state.user.email = action.payload.email;
        state.user.name = action.payload.login;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Slice Login", action.payload);
        state.user.email = action.payload.email;
        state.user.name = action.payload.login;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        console.log("Slice Logout", action.payload);
        state.user = initialState.user;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        console.log("Slice add post", action.payload);
        // state.posts.push(action.payload);
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        console.log("Slice getUserPosts", action.payload);
        state.posts = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
