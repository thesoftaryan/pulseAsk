import { Request, Response } from "express"

import { STATUS } from "../constants/statusCodes"
import { errorResponse, successResponse } from "../utils/response.util"
import { uploadImageService } from "../services/general.service";


export const uploadImageController = async (req : Request, res : Response)=>{
    if(!req.file){
        return errorResponse(
            res,
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "No image file provided",
        );
    }
    if(!req.file.mimetype.startsWith("image/")){
        return errorResponse(
            res,
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Only image files are allowed",
        );
    }

    const imageUrl = await uploadImageService(req.file.buffer);
    
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Image uploaded successfully",
        {
            imageUrl : imageUrl
        }
    );
}