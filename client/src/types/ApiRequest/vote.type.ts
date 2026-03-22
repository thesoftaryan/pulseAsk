type VoteType = 1 | -1;

export interface VotePayload{
    targetId: string;
    targetAuthor: string;
    vote: VoteType;
}