import {Schema, Types, model} from "mongoose";

export interface ChatMessageInterface{
    _id: Types.ObjectId;
    conversationId: Types.ObjectId;
    sender: Types.ObjectId;
    content: string;

    type: "text" | "image";
    caption?: string;

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

        caption:{
            type: String,
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



export interface ConversationInterface{
    _id: Types.ObjectId;
    conversationKey: string;
    participants: Types.ObjectId[];
    lastMessage?:{
        type: "image" | "text";
        content: string;
        caption?: string;
        sender: Types.ObjectId;
        sentAt: Date;
    };
    unreadCount: Number;
    // updatedAt: Date;
}

const ConversationSchema = new Schema<ConversationInterface>({
    conversationKey:{
        type: String,
        required: true,
    },
    participants:[
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    lastMessage:{
        type:{
            "type":{
                type:String,
                enum: ["text", "image"],
                default: "text",
            },
            content: {
                type: String,
            },
            caption:{
                type: String,
            },
            sender: {
                type: Schema.Types.ObjectId,
                ref:"User",
            },
            sentAt: {
                type: Date,
            },
        }
    },
    unreadCount: {
        type: Number,
        default: 0,
    }
    // updatedAt:{
    //     type: Date,
    // },
},
{timestamps: true},
);

ConversationSchema.index({conversationKey: 1}, {unique:true});

export const Conversation = model<ConversationInterface>("Conversation", ConversationSchema);