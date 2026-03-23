import { Request, Response } from "express";
import { VotePayload } from "../types/vote.type";
import { voteService } from "../services/vote.service";
import { VoteResponse } from "../types/response/vote.type";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";


export const voteAnswerController = async (req:Request, res:Response)=>{
    const data = req.body as VotePayload;
    const voteCount = await voteService(req.user!.uid, data, "answer");
    const response:VoteResponse = {
        voteCount,
    };
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Voted successfully",
    );
}