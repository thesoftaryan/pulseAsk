import { Request, Response } from "express";
import { fetchMessagesService, getContactsService, markAsSeenService, userContactDetailsService } from "../services/chat.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { ContactInterface, FetchMessagesResponse } from "../types/response/chat.type";
import { FetchMessagesPayload, GetUserContactDetailsPayload, MarkAsSeenPayload } from "../types/chat.type";


export const getContactsController = async (req:Request, res:Response) =>{
    // Person will be containing the populated details
    const contacts = await getContactsService(req.user?.uid!);
    const response = {contacts};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "User Contacts fetchted successfully",
        response,
    );
}

export const userContactDetailsController = async (req:Request, res:Response)=>{
    const data = req.body as GetUserContactDetailsPayload;
    const response = await userContactDetailsService(req.user?.uid!, data.userId);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Contact fetched successfully",
        response,
    )
}

export const fetchMessagesController = async (req:Request, res:Response)=>{
    const data = req.body as FetchMessagesPayload;
    const messages = await fetchMessagesService(req.user?.uid!, data.conversationId);
    const response:FetchMessagesResponse = {messages};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Fetched messages Successfully",
        response,
    );
}

export const markAsSeenController = async (req:Request, res:Response)=>{
    const data = req.body as MarkAsSeenPayload;
    await markAsSeenService(req.user?.uid!, data.conversationId);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Message updated successfully",
    );
}