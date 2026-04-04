import {Schema, Types, model} from "mongoose";

export interface ChatMessageInterface{
    _id: Types.ObjectId;
    conversationId: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;

    type: "text" | "image";

    status: "sent" | "seen";

    sentAt: Date;
}

const ChatMessageSchema = new Schema<ChatMessageInterface>(
    {
        conversationId:{
            type: Schema.Types.ObjectId,
            ref: "Conversation",
        },

        sender:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },

        content: {
            type: String,
            required:true,
        },

        type:{
            type: String,
            enum:["text", "image"],
            default: "text",
        },

        status:{
            type: String,
            enum:["seen", "sent"],
            default: "sent",
        },

        sentAt: {
            type: Date,
            required: true,
        },
    }
);

ChatMessageSchema.index({ conversationId: 1, sentAt:-1 });

export const ChatMessage = model<ChatMessageInterface>("ChatMessage", ChatMessageSchema);