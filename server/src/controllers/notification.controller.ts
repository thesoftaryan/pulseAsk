import { Request, Response } from "express";
import { fetchNotificationsService, markNotificationAsSeenService } from "../services/notification.service";
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

export const markNotificationAsSeenController = async (req:Request, res:Response)=>{
    await markNotificationAsSeenService(req.user?.uid!, req.body.notificationId);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Notification Status Updated",
    );
}