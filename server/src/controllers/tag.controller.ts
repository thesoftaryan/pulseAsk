import type { Request, Response } from "express";
import { FetchQuestionsByTagPayload, FetchTagPayload, GenerateTagPayload } from "../types/tag.type";
import { fetchQuestionsByTagService, fetchTagBySlugService, generateTagService } from "../services/tag.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { generateTagColor } from "../utils/tag.util";
import { GenerateTagResponse, QuestionsByTagResponse, TagBySlugResponse } from "../types/response/tag.type";


export const generateTagController = async (req : Request, res: Response)=>{
    const data = req.body as GenerateTagPayload;
    const tags = await generateTagService(data);

    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "Tags generated successfully",
        {
            tags: tags,
        },
    );
}

export const fetchTagBySlugController = async (req:Request, res:Response)=>{
    const data = req.body as FetchTagPayload;
    const tag = await fetchTagBySlugService(data);
    const response:TagBySlugResponse = {tag};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Tag fetched successfully",
        response,
    );
}

export const fetchQuestionsByTagController = async (req: Request, res:Response)=>{
    const data = req.body as FetchQuestionsByTagPayload;
    const questions = await fetchQuestionsByTagService(data);
    const response:QuestionsByTagResponse={questions};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Questions fetched successfully",
        response,
    );
}