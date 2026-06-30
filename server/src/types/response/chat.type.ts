import { Types } from "mongoose";
import { ChatMessageInterface } from "../../models/Chat.model";

export interface ContactPersonInterface{
    _id: string;
    userName: string;
    profile?: string;
    firstName: string;
    lastName?:string;
    status:"online"|"offline";
    lastSeen: Date;
}

export interface LastMessageInterface{
    messageType: "image" | "text";
    content: string;
    sender: string;
    sentAt: Date;
}

export interface ContactInterface{
    conversationId: string,
    person: ContactPersonInterface,
    lastMessage? : LastMessageInterface,
    unreadCount: Number,
}

export interface FetchMessagesResponse{
    messages: ChatMessageInterface[];
}