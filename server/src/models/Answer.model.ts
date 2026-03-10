import {Schema, model, Document} from "mongoose";
import { UserInterface } from "./User.model";

export interface AnswerInterface extends Document{
    questionId: Schema.Types.ObjectId;
    author: UserInterface;
    content: String;
    voteCount: Number;
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
            type: String,
            default:0,
        },
        askedAt:{
            type: Date,
        }
    },
    {timestamps: false},
);

export const Answer = model<AnswerInterface>("Answer", AnswerSchema);