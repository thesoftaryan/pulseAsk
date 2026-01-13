export interface ApiError{
    message : string,
    error?:{
        code : string,
        details : string,
    }
}

export interface ApiSuccess<T>{
    message : string,
    data? : T,
    meta? : Record<string, string>,
}