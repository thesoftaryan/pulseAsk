import type { AnswerInterface } from "./answer.type";
import type { QuestionInterface } from "./question.type";

export interface IsBookmarkedResponse{
    bookmarked: boolean;
}

export interface BookmarkedQuestionsResponse{
    questions: QuestionInterface[],
}

export interface BookmarkedAnswersResponse{
    answers:Partial<AnswerInterface>[]
};