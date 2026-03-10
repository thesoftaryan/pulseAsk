import {Schema, model, Document} from "mongoose";
import { UserInterface } from "./User.model";
import { AnswerInterface } from "./Answer.model";
import { TagInterface } from "./Tag.model";

export interface QuestionInterface extends Document{
    title: String;
    description: String;
    author: UserInterface;
    askedAt: Date;
    voteCount: Number;
    bestAnswer?: AnswerInterface;
    tags: TagInterface[];
}

const QuestionSchema = new Schema<QuestionInterface>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        author:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        askedAt: {
            type: Date,
            required: true,
        },
        voteCount:{
            type: Number,
            default:0,
        },
        bestAnswer:{
            type: Schema.Types.ObjectId,
            ref: "Answer",
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            }
        ],
    },
    {timestamps: false,},
);

export const Question = model<QuestionInterface>("Question", QuestionSchema);