import { Query } from "mongoose";
import { Answer } from "../models/Answer.model";
import { TargetType } from "../models/Vote.model";
import { VotePayload } from "../types/vote.type";
import { Question } from "../models/Question.model";

/**
 * @param data of form VotePayload
 * @returns updated vote count
 */
export const voteService = async (data : VotePayload, target: TargetType)=>{
    const model = (target=="answer")? Answer:Question;
}