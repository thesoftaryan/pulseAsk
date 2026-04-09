import { Types } from "mongoose";
import { AnswerInterface } from "../../models/Answer.model";
import { TagInterface } from "../../models/Tag.model";
import { UserInterface } from "../../models/User.model";
import { QuestionInterface } from "../../models/Question.model";

export interface FetchQuestionResponse extends QuestionInterface{
}

export interface FetchQuestionsResponse{
    questions: QuestionInterface[],
}