import { Request, Response } from "express";
import { getPeopleSearchResultService, getQASearchResultService } from "../services/search.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { SearchPayload } from "../types/search.type";
import { QuestionInterface } from "../models/Question.model";
import { FetchPeopleResultsResponse, FetchQAResultsResponse } from "../types/response/search.type";

export const getQASearchResultController = async (req:Request, res:Response)=>{
    const data = req.body as SearchPayload;
    const results = await getQASearchResultService(data);
    const response : FetchQAResultsResponse = {results};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Matches fetched",
        response,
    );
}


export const getPeopleSearchResultController = async (req:Request, res:Response)=>{
    const data = req.body as SearchPayload;
    const results = await getPeopleSearchResultService(data);
    const response:FetchPeopleResultsResponse = {results};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Matches fetched",
        response,
    );
}