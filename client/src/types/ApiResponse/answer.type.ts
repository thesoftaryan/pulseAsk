import type { QuestionInterface } from "./question.type";
import type { UserInterface } from "./user.type";

export interface AnswerInterface{
    _id: string;
    // will just be containing _id and slug of question
    qid: Partial<QuestionInterface>;
    author: Partial<UserInterface>;
    content: string;
    contentHTML: string;
    voteCount: number;
    askedAt: Date;
};


export interface PostAnswerResponse{

}

export interface FetchAnswersResponse{
    answers: AnswerInterface[];
}