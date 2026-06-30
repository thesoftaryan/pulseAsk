import { QuestionInterface } from "../../models/Question.model";
import { UserInterface } from "../../models/User.model";

export interface FetchQAResultsResponse{
    results: QuestionInterface[],
}

export interface FetchPeopleResultsResponse{
    results: Partial<UserInterface>[],
}