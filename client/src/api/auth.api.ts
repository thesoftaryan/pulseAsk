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

export const registerUser = ( data : RegisterData) => {
    return api.post("/auth/register", data);
}

export const loginUser = ( data : LoginData )=>{
    return api.post("/auth/login", data);
}

export const socialSignIn = (provider : "google")=>{
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
}