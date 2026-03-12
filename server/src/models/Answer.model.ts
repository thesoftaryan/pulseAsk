import {Schema, model, Document, Types} from "mongoose";
import { UserInterface } from "./User.model";

export interface AnswerInterface extends Document{
    _id: Types.ObjectId;
    questionId: Types.ObjectId;
    author: UserInterface;
    content: string;
    voteCount: number;
    askedAt: Date;
};

const AnswerSchema = new Schema<AnswerInterface>(
    {
        questionId: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
        },
        author:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        voteCount:{
            type: Number,
            default:0,
        },
        askedAt:{
            type: Date,
        }
    },
    {timestamps: false},
);

export const Answer = model<AnswerInterface>("Answer", AnswerSchema);