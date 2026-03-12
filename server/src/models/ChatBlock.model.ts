import {Schema, Types, model} from "mongoose";

export interface ChatBlockInterface{
    _id: Types.ObjectId;
    who: Types.ObjectId; // No need to populate it
    whom: Types.ObjectId; // No need to populate it
}

const ChatBlockSchema = new Schema<ChatBlockInterface>(
    {
        who:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        whom:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        }
    }
);

export const ChatBlock = model<ChatBlockInterface>("ChatBlock", ChatBlockSchema);