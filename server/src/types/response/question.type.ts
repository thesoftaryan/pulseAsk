import { Types } from "mongoose";
import { AnswerInterface } from "../../models/Answer.model";
import { TagInterface } from "../../models/Tag.model";
import { UserInterface } from "../../models/User.model";

export interface FetchQuestionReponse{
    _id: Types.ObjectId;
    slug:String;
    title: String;
    description: String;
    descriptionHTML: String;
    author: Partial<UserInterface>;
    askedAt: Date;
    voteCount: Number;
    bestAnswer?: AnswerInterface;
    tags: TagInterface[];
}