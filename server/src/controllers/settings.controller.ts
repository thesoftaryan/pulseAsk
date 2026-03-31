import { Request, Response } from "express";
import { STATUS } from "../constants/statusCodes.constants";
import { addKTagService, removeKTagService, updateBasicProfileService, updateSocialProfileService } from "../services/settings.service";
import { successResponse } from "../utils/response.util";
import { AddKTagPayload, RemoveKTagPayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../types/settings.type";

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

export const addKTagController = async (req:Request, res:Response)=>{
    const data = req.body as AddKTagPayload;
    const responseObj = await addKTagService(req.user?.uid!, data);
    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "Tag added successfully",
        responseObj,
    );
}

export const removeKTagController = async (req:Request, res:Response)=>{
    const data = req.body as RemoveKTagPayload;
    const responseObj = await removeKTagService(req.user?.uid!, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Tag removed successfully",
        responseObj,
    );
}