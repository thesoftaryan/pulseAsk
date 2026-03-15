import { Response } from "express";

export const successResponse = <T>(
    res:Response,
    statusCode : number,
    message : string,
    data? : T,
    // NOTE:
    // Meta is intentionally string for consistency
    meta? : Record<string, string>,
)=>{
    return res.status(statusCode).json({
        success : true,
        message,
        data,
        meta,
    });
};

export const errorResponse = <T>(
    res : Response,
    statusCode : number,
    message : string,
    meta?: Record<string, string>,
) => {
    if(!meta){
        meta = {
            code: statusCode.toString(),
            details : message,
        }
    }
    return res.status(statusCode).json({
        success : false,
        message,
        meta,
    });
};

export const redirectResponse = <T>(
    res: Response,
    url : string
)=>{
    res.redirect(url);
}