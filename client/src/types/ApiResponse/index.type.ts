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


export interface NoDataResponse{}

export interface UploadImageResponse{
    imageUrl: string;
}