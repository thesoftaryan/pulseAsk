import {Schema, model, Document, Types} from "mongoose";

export interface TagInterface extends Document{
    _id: Types.ObjectId;

    slug: string;
    name : string;
    
    color : string;

    usageCount: number;
}

const TagSchema = new Schema<TagInterface>(
    {
        slug:{
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        usageCount:{
            type: Number,
            default: 0,
        }
    },
    {timestamps: true},
);

export const Tag = model<TagInterface>("Tag", TagSchema);