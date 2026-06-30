import { AnswerInterface } from "../../models/Answer.model";
import { QuestionInterface } from "../../models/Question.model";

export interface FetchBookmarkedAnswersResponse{
    answers : Partial<AnswerInterface>[],
}

export interface FetchBookmarkedQuestionsResponse{
    questions: QuestionInterface[],
}

export interface IsBookmarkedResponse{
    bookmarked: boolean;
}