import { Types } from "mongoose";

type VoteType = 1 | -1;
export interface VotePayload{
    targetId: Types.ObjectId;
    targetAuthor: Types.ObjectId;
    vote: VoteType;
}