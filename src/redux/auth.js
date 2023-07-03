import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");

const initialAuthState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  email: initialEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      const { token, email } = action.payload;
      state.token = token;
      state.isLoggedIn = true;
      state.email = email;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      console.log("the user is successfully logged in");
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      console.log("the user is successfully logged out");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
