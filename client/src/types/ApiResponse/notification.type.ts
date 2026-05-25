// import type { UserInterface } from "./user.type";

import type { UserInterface } from "./user.type";

type NotificationType = "Answer" | "Chat" | "Payment" | "Announcement" | "Promotional";

export interface NotificationInterface{
    _id: string;
    sender: Partial<UserInterface>;
    recipient: Partial<UserInterface>;
    type: NotificationType;
    sentAt: Date;
    title: string;
    content: string;
    actionUrl: string;
    isRead: boolean;
}
