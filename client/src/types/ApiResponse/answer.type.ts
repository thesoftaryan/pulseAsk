import type { UserInterface } from "./user.type";

export interface AnswerInterface{
    _id: string;
    qid: string;
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