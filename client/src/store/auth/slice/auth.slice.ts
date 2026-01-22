import { createSlice } from "@reduxjs/toolkit";

import type { AuthState } from "../../../types/redux/auth.redux.types";

import { loginUserThunk } from "../thunks/login.thunk";

const initialState : AuthState = {
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        clearAuthError(state){
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // auth/login thunk
        .addCase(loginUserThunk.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(loginUserThunk.fulfilled, (state, action)=>{
            state.isAuthenticated = true;
            state.user = action.payload;
            state.status = "authenticated";
            state.error = null;
        })
        .addCase(loginUserThunk.rejected, (state, action)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.status = "unauthenticated";
            state.error = action.payload?.message ?? "Login Failed";
        })
    }
});

export const {clearAuthError} = authSlice.actions;
export default authSlice.reducer;