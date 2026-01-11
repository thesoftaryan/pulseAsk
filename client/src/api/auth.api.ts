import type { ForgotPasswordFormData, ResetPasswordFormData, VerifyEmailFormData } from "../types/auth";
import api from "./axios";

interface RegisterData{
    firstName : string;
    lastName : string;
    email : string;
    password : string;
}

interface LoginData{
    email : string;
    password : string;
}

export const registerUserAPI = ( data : RegisterData) => {
    return api.post("/auth/register", data);
}

export const loginUserAPI = ( data : LoginData )=>{
    return api.post("/auth/login", data);
}

export const socialSignInAPI = (provider : "google")=>{
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
}

export const forgotPasswordAPI = (data : ForgotPasswordFormData) => {
    return api.post("/auth/forgot-password", data);
}

export const resetPasswordAPI = (data : ResetPasswordFormData)=>{
    return api.post("/auth/reset-password", {password: data.password, token: data.token});
}

export const verifyEmailAPI = (data : VerifyEmailFormData) => {
    return api.post("/auth/verify-email", data);
}