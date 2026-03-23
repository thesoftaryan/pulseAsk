import type { UserInterface } from "./user.type";

export interface AnswerInterface{
    _id: string;
    questionId: string;
    author: Partial<UserInterface>;
    content: string;
    voteCount: number;
    askedAt: Date;
};


export interface PostAnswerResponse{

}

export interface FetchAnswersResponse{
    answers: AnswerInterface[];
}