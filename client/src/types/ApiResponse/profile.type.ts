import type { AnswerInterface } from "./answer.type";
import type { QuestionInterface } from "./question.type";
import type { UserInterface } from "./user.type";

export interface FetchProfileResponse{
    user:Partial<UserInterface>;
    questions: QuestionInterface[],
    answers: AnswerInterface[],
}