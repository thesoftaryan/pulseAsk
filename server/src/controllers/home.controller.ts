import {Request, Response} from "express";
import { STATUS } from "../constants/statusCodes.constants"
import { successResponse } from "../utils/response.util"

export const homeController = async (req : Request, res : Response)=>{
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "This is main content",
    );
}