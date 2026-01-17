export type OAuthProvider = "google";

export interface LoginFormData{
    email:string;
    password:string;
    rememberMe : boolean;
}

export interface RegisterFormData{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    agreement:boolean;
}

export interface ForgotPasswordFormData{
    email : string;
}

export interface ResetPasswordFormData{
    password : string;
    confirmPassword? : string;
    token : string|null;
}

export interface ResendVerificationEmailFormData{
    email : string;
    status?: string;
}