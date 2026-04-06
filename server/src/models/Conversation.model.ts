import { model, Schema, Types } from "mongoose";

export interface ConversationInterface{
    _id: Types.ObjectId;
    participants: Types.ObjectId[];
    lastMessage?:{
        text: string;
        sender: Types.ObjectId;
        sentAt: Date;
    };
    // updatedAt: Date;
}

const ConversationSchema = new Schema<ConversationInterface>({
    participants:[
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    lastMessage:{
        type:{
            text: {
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
    // updatedAt:{
    //     type: Date,
    // },
},
{timestamps: true},
);

ConversationSchema.index({participants: 1}, {unique:true});

export const Conversation = model<ConversationInterface>("Conversation", ConversationSchema);