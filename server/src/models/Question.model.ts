import {Schema, model, Document, Types} from "mongoose";
import { UserInterface } from "./User.model";
import { AnswerInterface } from "./Answer.model";
import { TagInterface } from "./Tag.model";

export interface QuestionInterface extends Document{
    _id: Types.ObjectId;
    slug: string;
    title: String;
    description: String;
    descriptionHTML: string;
    author: UserInterface;
    askedAt: Date;
    voteCount: Number;
    bestAnswer?: Types.ObjectId;
    tags: TagInterface[];
}

const QuestionSchema = new Schema<QuestionInterface>(
    {
        slug:{
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        descriptionHTML: {
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