import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem('token');

const initialAuthState = {
    token:initialToken,
    isLoggedIn:!!initialToken,  
};

const authSlice =createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login(state, action) {
            state.token = action.token;
            state.isLoggedIn = true;
            localStorage.setItem("token", action.payload);
            console.log("the user is successfully logged in");
          },
          logout(state) {
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            console.log("the user is successfully logged out");
          },
    }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;