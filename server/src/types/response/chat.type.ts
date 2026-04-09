import { Types } from "mongoose";
import { ChatMessageInterface } from "../../models/Chat.model";

export interface ContactPersonInterface{
    _id: string;
    userName: string;
    profile?: string;
    firstName: string;
    lastName?:string;
}

export interface LastMessageInterface{
    messageType: "image" | "text";
    content: string;
    sender: string;
    sentAt: Date;
}

export interface ContactInterface{
    conversationId: Types.ObjectId,
    person: ContactPersonInterface,
    lastMessage? : LastMessageInterface,
}

export interface FetchMessagesResponse{
    messages: ChatMessageInterface[];
}

// export interface GetUserContactDetailsResponse extends ContactInterface{

// }