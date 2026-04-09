import { Request, Response } from "express";
import { fetchMessagesService, getContactsService, userContactDetailsService } from "../services/chat.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";


export const getContactsController = async (req:Request, res:Response) =>{
    // Person will be containing the populated details
    const contacts = await getContactsService(req.user?.uid!);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "User Contacts fetchted successfully",
        {contacts},
    );
}

export const userContactDetailsController = async (req:Request, res:Response)=>{
    const responseObj = await userContactDetailsService(req.user?.uid!, req.body.userId);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Contact fetched successfully",
        responseObj,
    )
}

export const fetchMessagesController = async (req:Request, res:Response)=>{
    const data = req.body;
    const messages = await fetchMessagesService(req.body.conversationId);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Fetched messages Successfully",
        {messages},
    );
}