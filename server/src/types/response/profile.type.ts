import { AnswerInterface } from "../../models/Answer.model";
import { QuestionInterface } from "../../models/Question.model";
import { UserInterface } from "../../models/User.model";

export interface FetchProfileResponse{
    user:Partial<UserInterface>;
    questions: QuestionInterface[],
    answers: AnswerInterface[],
}