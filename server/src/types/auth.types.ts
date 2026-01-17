export interface RefreshTokenPayload{
    refresh_token : string;
}

export interface LoginPayload{
    email : string;
    password : string;
    rememberMe : boolean;
}

export interface RegisterPayload{
    firstName : string;
    lastName : string;
    email : string;
    password : string;
}

export interface ForgotPasswordPayload{
    email : string;
}

export interface ResetPasswordPayload{
    password : string;
    token : string;
}

export interface VerifyEmailPayload{
    email : string;
}

export interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token?:string;
    scope: string;
    token_type: "Bearer";
    id_token?: string;
}

export interface GoogleUserInfo {
    sub: string;            // Google Unique user ID
    name: string;
    given_name?: string;
    picture?: string;
    email : string;
    email_verified : boolean;
    family_name?: string;
}