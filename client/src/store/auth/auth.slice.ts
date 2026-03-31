import { createSlice } from "@reduxjs/toolkit";

import type { AuthState } from "../../types/redux/auth.redux.types";

import { loginThunk } from "./thunks/login.thunk";
import { registerThunk } from "./thunks/register.thunk";
import { logoutThunk } from "./thunks/logout.thunk";
import { forgotPasswordThunk } from "./thunks/forgotPassword.thunk";
import { resendVerificationEmailThunk } from "./thunks/resendVerificationEmail.thunk";
import { resetPasswordThunk } from "./thunks/resetPassword.thunk";
import { checkAuthThunk } from "./thunks/checkAuth.thunk";

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
        addKTag(state, action){
            state.user?.tags?.push(action.payload.tag);
        },
        removeKTag(state, action){
            state.user?.tags?.filter(
                tag => tag._id !== action.payload.kTid,
            );
        },
        clearAuthError(state){
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // auth/login thunk reducer
        .addCase(loginThunk.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(loginThunk.fulfilled, (state, action)=>{
            localStorage.setItem("session_active", "true");
            state.isAuthenticated = true;
            state.user = action.payload.data!.user;
            state.status = "authenticated";
            state.error = null;
        })
        .addCase(loginThunk.rejected, (state, action)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.status = "unauthenticated";
            state.error = action.payload!.message;
        })
        // auth/register thunk reducer
        .addCase(registerThunk.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(registerThunk.fulfilled, (state)=>{
            state.status = "idle";
        })
        .addCase(registerThunk.rejected, (state, action)=>{
            state.status = "idle";
            state.error = action.payload!.message;
        })
        // auth/logout thunk reducer
        .addCase(logoutThunk.pending, (state)=>{
            // console.log("logout pending");
            
            state.status = "loading";
            state.error = null;
        })
        .addCase(logoutThunk.fulfilled, (state)=>{
            // console.log("logout fulfilled");
            
            localStorage.removeItem("session_active");
            state.status = "unauthenticated";
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(logoutThunk.rejected, (state, action)=>{
            // console.log("logout rejected");
            
            state.status = "idle";
            state.error = action.payload!.message;
        })
        // auth/forgotPassword thunk reducer
        .addCase(forgotPasswordThunk.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(forgotPasswordThunk.fulfilled, (state)=>{
            state.status = "idle";
            state.error = null;
        })
        .addCase(forgotPasswordThunk.rejected, (state, action)=>{
            state.status = "idle";
            state.error = action.payload!.message;
        })
        // auth/resendVerificationEmail thunk reducer
        .addCase(resendVerificationEmailThunk.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(resendVerificationEmailThunk.fulfilled, (state)=>{
            state.status = "idle";
        })
        .addCase(resendVerificationEmailThunk.rejected, (state, action)=>{
            state.status = "idle";
            state.error = action.payload!.message;
        })
        // auth/resetPassword thunk reducer
        .addCase(resetPasswordThunk.pending, (state)=>{
            state.status = "loading";
            state.error = null;
        })
        .addCase(resetPasswordThunk.fulfilled, (state)=>{
            state.status = "idle";
        })
        .addCase(resetPasswordThunk.rejected, (state, action)=>{
            state.status = "idle";
            state.error = action.payload!.message;
        })
        //
        .addCase(checkAuthThunk.pending, (state)=>{
            // console.log("Check auth pending");
            
            state.status = "loading";
            state.error = null;
        })
        .addCase(checkAuthThunk.fulfilled, (state, action)=>{
            // console.log("Check auth fulfilled");
            state.isAuthenticated = true;
            state.status = "authenticated";
            state.user = action.payload.data!.user;
            // console.log(state.user);
        })
        .addCase(checkAuthThunk.rejected, (state, action)=>{
            // console.log("Check auth rejected");
            // localStorage.removeItem("session_active");
            state.isAuthenticated = false;
            state.user = null;
            state.status = "unauthenticated";
            state.error = action.payload!.message;
        })

    }
});

export const {clearAuthError, addKTag, removeKTag} = authSlice.actions;
export default authSlice.reducer;