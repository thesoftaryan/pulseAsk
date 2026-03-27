import { Request, Response } from "express";
import { FetchProfilePayload } from "../types/profile.type";
import { fetchProfileService } from "../services/profile.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";


export const fetchProfileController = async (req: Request, res: Response) =>{
    const data = req.body as FetchProfilePayload;
    console.log("received request for username: ", data.userName);
    
    const user = await fetchProfileService(data);
    // console.log("user: ", user);
    
    // const responseObj = {
    //     _id : user?._id,
    //     profile: user?.profile,
    //     userName: user?.userName,
    //     firstName: user?.firstName,
    //     lastName: user?.lastName,
    //     email: user?.email,
    //     college: user?.college,
    //     description: user?.description,
    //     tags: user?.tags,
    // }
    const responseObj = {
        user,
    }
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Profile fetched successfully",
        responseObj,
    )
}