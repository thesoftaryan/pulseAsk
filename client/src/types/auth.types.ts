export type OAuthProvider = "google";

export interface LoginFormData{
    email:string;
    password:string;
    remember_me : boolean;
}

export interface RegisterFormData{
    first_name:string;
    last_name:string;
    email:string;
    password:string;
    agreement:boolean;
}

export interface ForgotPasswordFormData{
    email : string;
}

export interface ResetPasswordFormData{
    password : string;
    confirm_password? : string;
    token : string|null;
}

export interface ResendVerificationEmailFormData{
    email : string;
    status?: string;
}