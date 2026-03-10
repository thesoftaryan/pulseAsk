import type { User } from "./user.types"

export interface ApiResponse<T>{
    success : boolean;
    message : string;
    data ? : T;
    meta ? : Record<string, string>;
}

export interface ApiError{
    success : boolean;
    message : string;
    meta? : Record<string, string>;
}

export interface UserResponseData{
    user : User;
}

export interface NoDataResponse{
    
}

export interface UploadImageResponse{
    imageUrl: string;
}