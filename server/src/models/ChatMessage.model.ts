import {Schema, Types, model} from "mongoose";

export interface ChatMessageInterface{
    _id: Types.ObjectId;
    sentAt: Date;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    content: string;
    read: boolean;
}

const ChatMessageSchema = new Schema<ChatMessageInterface>(
    {
        sentAt: {
            type: Date,
            required: true,
        },
        sender:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        receiver:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        content: {
            type: String,
            required:true,
        },
        read:{
            type: Boolean,
            default: false,
        },
    }
);

export const ChatMessage = model<ChatMessageInterface>("ChatMessage", ChatMessageSchema);