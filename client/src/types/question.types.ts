import type { ReactElement } from "react";
import type { User } from "./user.types";

export interface TagInterface{
    name : string;
    color : string;
}

export interface QuestionInterface{
    id : string;
    author : User;
    title : string;
    tags? : Array<TagInterface>;
    best_answer? : ReactElement<any, any>;
}