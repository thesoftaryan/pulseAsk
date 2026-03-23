import { AnswerInterface } from "../../models/Answer.model";

export interface PostAnswerResponse{

}

export interface FetchAnswersResponse{
    answers: AnswerInterface[];
}