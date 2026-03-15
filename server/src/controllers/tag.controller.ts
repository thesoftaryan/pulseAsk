import type { Request, Response } from "express";
import { GenerateTagPayload } from "../types/tag.type";
import { GenerateTagService } from "../services/tag.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes";
import { TagInterface } from "../models/Tag.model";
import { generateTagColor, slugifyTag } from "../utils/tag.util";
import { Types } from "mongoose";


export const GenerateTagController = async (req : Request, res: Response)=>{
    const data = req.body as GenerateTagPayload;
    const tags = await GenerateTagService(data);

    const tagsResponse : Partial<TagInterface>[] = [];

    tags.map((tagName)=>{
        const tag : Partial<TagInterface> = {
            name: tagName,
            color: generateTagColor(tagName),
        };
        tagsResponse.push(tag);
    });


    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "Tags generated successfully",
        tagsResponse,
    );
}