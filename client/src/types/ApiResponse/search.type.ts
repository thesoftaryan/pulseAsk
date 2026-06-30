import type { QuestionInterface } from "./question.type";
import type { UserInterface } from "./user.type";

export interface FetchQAResultsResponse{
    results: QuestionInterface[],
}

export interface FetchPeopleResultsResponse{
    results: Partial<UserInterface>[],
}