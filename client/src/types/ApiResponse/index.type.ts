import type { TagInterface } from "./tag.type";
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

export interface UserResponseData{
    user: Partial<UserInterface>;
};

export interface TagResponseData extends Partial<TagInterface>{};

export interface NoDataResponse{}

export interface UploadImageResponse{
    imageUrl: string;
}