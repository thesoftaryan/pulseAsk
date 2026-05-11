import {Schema, model, Document, Types} from "mongoose";
import { QuestionInterface } from "./Question.model";
import { AnswerInterface } from "./Answer.model";

export interface BookmarkInterface extends Document{
    _id: Types.ObjectId;
    userId : Types.ObjectId;
    type: string;
    targetId: Types.ObjectId;
}

const BookmarkSchema = new Schema<BookmarkInterface>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        type:{
            type: String,
            enum: ["answer", "question"],
            required: true,
        },
        targetId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {timestamps: true},
);

export const Bookmark = model<BookmarkInterface>("Bookmark", BookmarkSchema);