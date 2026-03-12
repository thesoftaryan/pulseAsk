// import type { UserInterface } from "./user.type";

type NotificationType = "Answer" | "Chat" | "Payment" | "Announcement" | "Promotional";

export interface NotificationInterface{
    _id: string;
    recipient: string;
    type: NotificationType;
    sentAt: Date;
    title: string;
    content: string;
    actionUrl: string;
}
