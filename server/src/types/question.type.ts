import { TagPayload } from "./tag.type";

export interface AskQuestionPayload{
    title: string;
    description: string;
    // descriptionJson?: string;
    descriptionHTML: string;
    tags: TagPayload[];
}