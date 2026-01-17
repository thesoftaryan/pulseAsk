import type { RegisterFormData, LoginFormData, ForgotPasswordFormData, ResetPasswordFormData, ResendVerificationEmailFormData } from "../types/auth";
import api from "./axios";



export const registerUserAPI = ( data : RegisterFormData) => {
    return api.post("/auth/register", data);
}

export const loginUserAPI = ( data : LoginFormData )=>{
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

export const verifyEmailAPI = (data : ResendVerificationEmailFormData) => {
    return api.post("/auth/resend-verification-email", data);
}