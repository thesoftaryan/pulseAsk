import type { Request, Response } from "express";
import { GenerateTagPayload } from "../types/tag.type";
import { generateTagService } from "../services/tag.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";
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
