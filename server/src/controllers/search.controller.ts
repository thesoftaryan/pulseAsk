import { Request, Response } from "express";
import { getPeopleSearchResultService, getQASearchResultService } from "../services/search.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";

export const getQASearchResultController = async (req:Request, res:Response)=>{
    const results = await getQASearchResultService(req.body.query??"");
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Matches fetched",
        {results},
    );
}


export const getPeopleSearchResultController = async (req:Request, res:Response)=>{
    const results = await getPeopleSearchResultService(req.body.query??"");
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Matches fetched",
        {results},
    );
}