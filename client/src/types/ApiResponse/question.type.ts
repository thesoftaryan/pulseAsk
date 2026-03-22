import type { UserInterface } from "./user.type";
import type { TagInterface } from "./tag.type";
import type { AnswerInterface } from "./answer.type";

export interface QuestionInterface{
    _id: string;
    slug:string;
    title: string;
    description: string;
    descriptionHTML: string;
    author: Partial<UserInterface>;
    askedAt: Date;
    voteCount: number;
    bestAnswer?: AnswerInterface;
    tags: TagInterface[];
}

export interface AskQuestionResponse{
    qid: string;
    slug: string;
}