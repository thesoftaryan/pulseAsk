import { Request, Response } from "express";
import { FetchProfilePayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../types/profile.type";
import { fetchProfileService, updateBasicProfileService, updateSocialProfileService } from "../services/profile.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";


export const fetchProfileController = async (req: Request, res: Response) =>{
    const data = req.body as FetchProfilePayload;
    // console.log("received request for username: ", data.userName);
    
    const responseObj = await fetchProfileService(data);

    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Profile fetched successfully",
        responseObj,
    )
}

export const updateBasicProfileController = async (req:Request, res: Response)=>{
    const data = req.body as UpdateBasicProfilePayload;
    const responseObj = await updateBasicProfileService(req.user!.uid, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Details updated successfully",
        responseObj,
    );
}

export const updateSocialProfileController = async(req:Request, res:Response)=>{
    const data = req.body as UpdateSocialProfilePayload;
    const responseObj = await updateSocialProfileService(req.user!.uid, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Details updated successfully",
        responseObj,
    );
}