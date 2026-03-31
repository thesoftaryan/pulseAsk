import { Request, Response } from "express";
import { VotePayload } from "../types/vote.type";
import { voteService } from "../services/vote.service";
import { VoteResponse } from "../types/response/vote.type";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { FetchAnswersPayload, PostAnswerPayload } from "../types/answer.type";
import { fetchAnswerCommentsService, fetchAnswersService, postAnswerCommentService, postAnswerService } from "../services/answer.service";
import { FetchAnswersResponse } from "../types/response/answer.type";
import { FetchCommentsPayload, PostCommentPayload } from "../types/comment.type";
import { FetchCommentsResponse, PostCommentResponse } from "../types/response/comment.type";


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
        response,
    );
}

export const postAnswerController = async (req: Request, res: Response)=>{
    const data = req.body as PostAnswerPayload;
    await postAnswerService(req.user!.uid, data);
    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "Answer posted successfully",
    );
}

export const fetchAnswersController = async (req:Request, res:Response)=>{
    const data = req.body as FetchAnswersPayload;
    const answers = await fetchAnswersService(data);
    const response:FetchAnswersResponse={
        answers,
    }
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Answers Fetched Successfully",
        response,
    );
}

export const fetchAnswerCommentsController = async (req:Request, res:Response)=>{
    const data = req.body as FetchCommentsPayload;
    const comments = await fetchAnswerCommentsService(data);

    const response:FetchCommentsResponse = {comments};
    
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Comments fetched successfully",
        response,
    );
}

export const postAnswerCommentController = async (req:Request, res:Response)=>{
    const data = req.body as PostCommentPayload;
    await postAnswerCommentService(req.user?.uid!, data);
    const response:PostCommentResponse = {};
    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "Commented successfully",
        response,
    );
}