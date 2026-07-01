import type { TagPayload } from "../ApiRequest/tag.type";
import type { QuestionInterface } from "./question.type";

export interface TagInterface{
    _id: string;
    
    slug: string;
    name : string;
    
    color : string;

    usageCount: number;
}

export interface TagResponse{
    tags: TagPayload[];
};

export interface TagBySlugResponse{
    tag: TagInterface;
}

export interface QuestionsByTagResponse{
    questions: QuestionInterface[];
}