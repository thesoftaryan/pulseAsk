import type { Request, Response } from "express";
import { GenerateTagPayload } from "../types/tag.type";
import { fetchQuestionsByTagService, fetchTagBySlugService, generateTagService } from "../services/tag.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { generateTagColor } from "../utils/tag.util";
import { GenerateTagResponse } from "../types/response/tag.type";


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
    const {tagSlug} = req.body;
    const tag = await fetchTagBySlugService(tagSlug);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Tag fetched successfully",
        {
            tag,
        }
    );
}

export const fetchQuestionsByTagController = async (req: Request, res:Response)=>{
    const {tagId} = req.body;
    const questions = await fetchQuestionsByTagService(tagId);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Questions fetched successfully",
        {
            questions,
        },
    );
}