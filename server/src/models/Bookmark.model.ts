import {Schema, model, Document, Types} from "mongoose";
import { QuestionInterface } from "./Question.model";

export interface BookmarkInterface extends Document{
    _id: Types.ObjectId;
    userId : Types.ObjectId;
    questionId: QuestionInterface;
}

const BookmarkSchema = new Schema<BookmarkInterface>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        questionId: {
            type: Schema.Types.ObjectId,
            ref:"Question",
            required: true,
        }
    },
    {timestamps: true},
);

export const Bookmark = model<BookmarkInterface>("Bookmark", BookmarkSchema);