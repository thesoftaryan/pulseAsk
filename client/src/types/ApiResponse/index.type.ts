import type { UserInterface } from "./user.type";

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

export interface UserResponseData extends Partial<UserInterface>{}

export interface NoDataResponse{}

export interface UploadImageResponse{
    imageUrl: string;
}