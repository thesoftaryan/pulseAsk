import type { QuestionInterface } from "./question.type";

export interface BookmarkInterface extends Document{
    _id: string;
    userId : string;
    question: QuestionInterface;
}