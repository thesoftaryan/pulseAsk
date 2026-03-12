import {Schema, model, Document, Types} from "mongoose";
import { QuestionInterface } from "./Question.model";

export interface BookmarkInterface extends Document{
    _id: Types.ObjectId;
    userId : Types.ObjectId;
    question: QuestionInterface; // will be populated before sending
}

const BookmarkSchema = new Schema<BookmarkInterface>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        question: {
            type: Schema.Types.ObjectId,
            ref:"Question",
            required: true,
        }
    },
    {timestamps: true},
);

export const Bookmark = model<BookmarkInterface>("Bookmark", BookmarkSchema);