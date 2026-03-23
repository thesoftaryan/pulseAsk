export interface PostAnswerPayload{
    qid: string;
    content: string; // text content
    contentHTML: string;
    // contentJSON: string;
}

export interface FetchAnswersPayload{
    qid: string;
}