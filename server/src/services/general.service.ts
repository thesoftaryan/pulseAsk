// Cloudinary image upload service
import { STATES } from "mongoose";
import cloudinary from "../config/cloudinary.config";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";

/**
 * @param 
 * @returns Image Url
 */
export const uploadImageService = async (fileBuffer : Buffer) : Promise<string> =>{
    try{
        const result = await new Promise<any>((resolve, reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "pulseask/images",
                    resource_type: "image",
                },
                (error, result)=>{
                    if(error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(fileBuffer);
        });
        if(!result?.secure_url){
            throw new ApiError(
                STATUS.SERVER_ERROR.BAD_GATEWAY,
                "Image upload failed",
            );
        }
        return result.secure_url;
    }catch(err){
        throw new ApiError(
            STATUS.SERVER_ERROR.BAD_GATEWAY,
            "Image upload failed",
        );
    }
}