import { Request, Response } from "express"
import { AskQuestionPayload, FetchQuestionPayload } from "../types/question.type"
import { askQuestionService, fetchQuestionService } from "../services/question.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";

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
    const question = await fetchQuestionService(data);

    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Question fetched successfully",
        question,
    );
}