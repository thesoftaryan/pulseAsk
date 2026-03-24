import { Request, Response } from "express"
import { AskQuestionPayload, FetchQuestionPayload } from "../types/question.type"
import { askQuestionService, fetchQuestionService, fetchQuestionsService } from "../services/question.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";
import { VotePayload } from "../types/vote.type";
import { voteService } from "../services/vote.service";
import { VoteResponse } from "../types/response/vote.type";

export const askQuestionController = async (req:Request, res: Response)=>{
    const data = req.body as AskQuestionPayload;

    const question = await askQuestionService(data, req.user!.uid);

    const response = {
            qid: question._id,
            slug: question.slug,
        };

    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "Question created successfully",
        response,
    );
};

export const fetchQuestionController = async (req: Request, res: Response)=>{
    const data = req.body as FetchQuestionPayload;
    // console.log("qid: ",data)
    const response = await fetchQuestionService(data);

    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Question fetched successfully",
        response,
    );
};

export const voteQuestionController = async (req: Request, res: Response) => {
    const data = req.body as VotePayload;
    const voteCount = await voteService(req.user!.uid, data, "question");
    const response:VoteResponse ={
        voteCount,
    }
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "voted successfully",
        response,
    );
};

export const fetchQuestionsController = async (req:Request, res:Response)=>{
    const questions = await fetchQuestionsService();
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Questions fetched successfully",
        questions,
    );
}