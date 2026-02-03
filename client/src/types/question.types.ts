import type { AnswerInterface } from "./answer.types";
import type { User } from "./user.types";

interface TagInterface{
    name : string;
    color : string;
}

export interface QuestionInterface{
    author : User;
    title : string;
    tags? : Array<TagInterface>;
    best_answer? : AnswerInterface;
}