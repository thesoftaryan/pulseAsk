import { Schema, Document, Types, model} from "mongoose";
import { UserInterface } from "./User.model";

type NotificationType = "Answer" | "Chat" | "Payment" | "Announcement" | "Promotional";

export interface NotificationInterface extends Document{
    _id: Types.ObjectId;
    recipient: UserInterface;
    type: NotificationType;
    sentAt: Date;
    title: string;
    content: string;
    actionUrl: string;
    isRead: boolean;
}

const NotificationSchema = new Schema<NotificationInterface>(
    {
        recipient:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        type: {
            type: String,
            enum: ["Answer", "Chat", "Payment", "Announcement", "Promotional"],
            default: "Announcement",
        },
        sentAt: {
            type: Date,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        actionUrl: {
            type: String,
        },
        isRead: {
            type: Boolean,
            default: false,
        }
    }
);

export const Notification = model<NotificationInterface>("Notification", NotificationSchema);