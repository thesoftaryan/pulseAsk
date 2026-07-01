import { QuestionInterface } from "../../models/Question.model";
import { TagInterface } from "../../models/Tag.model";

export interface GenerateTagResponse{
    name: string;
    color: string;
}

export interface TagBySlugResponse{
    tag: TagInterface;
}

export interface QuestionsByTagResponse{
    questions: QuestionInterface[];
}