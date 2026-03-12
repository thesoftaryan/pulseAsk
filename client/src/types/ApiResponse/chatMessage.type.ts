// import type { UserInterface } from "./user.type";

export interface ChatMessageInterface{
    _id: string;
    sentAt: Date;
    sender: string;
    receiver: string;
    content: string;
    read: boolean;
}
