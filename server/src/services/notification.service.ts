import { Notification } from "../models/Notification.model"
import { User } from "../models/User.model"

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
        content: `${sender?.firstName} answered your question`,
        actionUrl: `${process.env.CLIENT_URL}/question/${questionId}`,
    });
    await User.updateOne({_id:receiverId}, {
        $inc: {unreadNotificationCount: 1},
    });
    return notification;
}