import type { TagPayload } from "../ApiRequest/tag.type";

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