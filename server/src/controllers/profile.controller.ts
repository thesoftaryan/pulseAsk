import { Request, Response } from "express";
import { FetchProfilePayload } from "../types/profile.type";
import { fetchProfileService } from "../services/profile.service";
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