import type { UserInterface } from "./user.type";
import type { TagInterface } from "./tag.type";
import type { AnswerInterface } from "./answer.type";

export interface QuestionInterface{
    _id: string;
    title: String;
    description: String;
    author: Partial<UserInterface>;
    askedAt: Date;
    voteCount: Number;
    bestAnswer?: AnswerInterface;
    tags: TagInterface[];
}