import {Schema, model, Document} from "mongoose";

export interface TagInterface extends Document{
    name : string;
    color : string;
}

const TagSchema = new Schema<TagInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        }
    },
    {timestamps: true},
);

export const Tag = model<TagInterface>("Tag", TagSchema);