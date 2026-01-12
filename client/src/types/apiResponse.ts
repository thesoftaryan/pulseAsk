export interface ApiError{
    success : boolean,
    message : string,
    error?:{
        code : string,
        details : string,
    }
}

export interface ApiSuccess<T>{
    success : boolean,
    message : string,
    data? : T,
    meta? : Record<string, string>,
}