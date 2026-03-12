import {Schema, model, Document, Types} from "mongoose";
import { QuestionInterface } from "./Question.model";

export interface CommentInterface extends Document{
    _id: Types.ObjectId;
    answerId: QuestionInterface;
    author : Types.ObjectId;
    content: String;
    commentedAt: Date;
}

const CommentSchema = new Schema<CommentInterface>(
    {
        
        answerId: {
            type: Schema.Types.ObjectId,
            ref:"Answer",
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        commentedAt:{
            type: Date,
            required: true,
        }
    },
    {timestamps: true},
);

export const Comment = model<CommentInterface>("Comment", CommentSchema);