import { Types } from "mongoose";

export interface FetchMessagesPayload{
    conversationId: Types.ObjectId;
}

export interface GetUserContactDetailsPayload{
    userId: Types.ObjectId;
}

export interface MarkAsSeenPayload{
    conversationId: Types.ObjectId;
}

export interface SendMessagePayload{
    senderId: Types.ObjectId;
    receiverId: Types.ObjectId;
    content: string;
    caption?:string;
    type: "text" | "image";
}