import type { RegisterFormData, LoginFormData, ForgotPasswordFormData, ResetPasswordFormData, ResendVerificationEmailFormData } from "../types/ApiRequest/auth.type";
import api from "./axios";


export const checkAuthAPI = () => {
    return api.get("/auth/me");
}

export const registerAPI = ( data : RegisterFormData) => {
    return api.post("/auth/register", data);
}

export const loginAPI = ( data : LoginFormData )=>{
    return api.post("/auth/login", data);
}

export const logoutAPI = ()=>{
    return api.post("/auth/logout");
}

export const socialSignInAPI = (provider : "google")=>{
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/${provider}`;
}

export const forgotPasswordAPI = (data : ForgotPasswordFormData) => {
    return api.post("/auth/forgot-password", data);
}

export const resetPasswordAPI = (data : ResetPasswordFormData)=>{
    return api.post("/auth/reset-password", {password: data.password, token: data.token});
}

export const resendVerificationEmailAPI = (data : ResendVerificationEmailFormData) => {
    return api.post("/auth/resend-verification-email", data);
}