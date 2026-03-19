import { Request, Response } from "express"
import { AskQuestionPayload } from "../types/question.type"
import { QuestionInterface } from "../models/Question.model";
import { askQuestionService } from "../services/question.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";

export const AskQuestionController = async (req:Request, res: Response)=>{
    const data = req.body as AskQuestionPayload;

    const question = await askQuestionService(data, req.user!.uid);

    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "Question created successfully",
        question,
    );
}