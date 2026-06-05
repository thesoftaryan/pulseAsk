import { Request, Response } from "express";
import { fetchNotificationsService } from "../services/notification.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";


export const fetchNotificationController = async (req:Request, res:Response)=>{
    const notifications = await fetchNotificationsService(req.user?.uid!);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Notifications fetched",
        {notifications},
    );
}