import { model, Schema, Types } from "mongoose";

interface ConversationInterface{
    _id: Types.ObjectId;
    participants: Types.ObjectId[];
    lastMessage?:{
        text: string;
        sender: Types.ObjectId;
        sentAt: Date;
    };
    updatedAt: Date;
}

const ConversationSchema = new Schema<ConversationInterface>({
    participants:[
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    lastMessage:{
        text: String,
        sender: {
            type: Schema.Types.ObjectId,
            ref:"User",
        },
        sentAt: Date,
    },
    updatedAt:{
        type: Date,
    },
},
{timestamps: true},
);

ConversationSchema.index({participants: 1});

export const Conversation = model<ConversationInterface>("Conversation", ConversationSchema);