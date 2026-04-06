import { Request, Response } from "express";
import { fetchMessagesService, getContactsService } from "../services/chat.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";


export const getContactsController = async (req:Request, res:Response) =>{
    const contacts = await getContactsService(req.user?.uid!);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "User Contacts fetchted successfully",
        contacts,
    );
}

export const fetchMessagesController = async (req:Request, res:Response)=>{
    const messages = await fetchMessagesService(req.body.conversationId);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Fetched messages Successfully",
        messages,
    );
}