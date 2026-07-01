export interface GenerateTagPayload{
    title: string;
    description: string;
}

export interface TagPayload{
    name: string;
    color?: string;
}

export interface FetchTagPayload{
    tagSlug: string;
}

export interface FetchQuestionsByTagPayload{
    tagId: string;
}