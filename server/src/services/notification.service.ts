import { Types } from "mongoose";
import { Notification } from "../models/Notification.model"
import { User } from "../models/User.model"


export const fetchNotificationsService = async (uid:Types.ObjectId)=>{
    const notifications = await Notification.find({recipient: uid});
    return notifications;
}

export const markNotificationAsSeenService = async (uid:Types.ObjectId, notificationId: Types.ObjectId)=>{
    await Notification.updateOne({_id: notificationId, recipient: uid}, {
        isRead: true,
    });
    await User.updateOne({_id: uid, unreadNotificationCount: {$gt: 0}}, {
        $inc:{
            unreadNotificationCount: -1,
        }
    });
}

export const createAnswerNotificationService = async (
    data : any
)=>{
    const {senderId,receiverId,answerId,questionId} = data;
    const sender = await User.findById(senderId).select("_id userName firstName lastName");
    const notification = await Notification.create({
        sender: senderId,
        recipient: receiverId,
        notificationType: "Answer",
        sentAt: new Date(Date.now()),
        title: "Received an answer",
        content: `${sender?.userName} answered your question`,
        actionUrl: `/question/${questionId}/slug`,
    });
    await User.updateOne({_id:receiverId}, {
        $inc: {unreadNotificationCount: 1},
    });
    return notification;
}

export const createTransactionNotificationService = async (
    data : any
)=>{
    const {senderId,receiverId,amount} = data;
    const sender = await User.findById(senderId).select("_id userName firstName lastName");
    const notification = await Notification.create({
        sender: senderId,
        recipient: receiverId,
        notificationType: "Payment",
        sentAt: new Date(Date.now()),
        title: "Received PulsePoints",
        content: `${sender?.userName} sent you ${amount} PulsePoints`,
        actionUrl: `/wallet/`,
    });
    await User.updateOne({_id:receiverId}, {
        $inc: {unreadNotificationCount: 1},
    });
    return notification;
}