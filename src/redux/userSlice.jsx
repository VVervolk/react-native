import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./operations";

const initialState = {
  user: { name: "", email: "" },
  posts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user.email = action.payload.email;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user.email = action.payload.email;
      });
  },
});

export const userReducer = userSlice.reducer;
