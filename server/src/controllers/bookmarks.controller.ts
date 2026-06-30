import { Request, Response } from "express";
import { addBookmarkService, fetchBookmarkedAnswersService, fetchBookmarkedQuestionsService, isBookmarkedService, removeBookmarkService } from "../services/bookmarks.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { FetchBookmarkedAnswersResponse, FetchBookmarkedQuestionsResponse, IsBookmarkedResponse } from "../types/response/bookmarks.type";
import { BookmarkPayload } from "../types/bookmarks.type";


export const addBookmarkController = async (req:Request, res:Response)=>{
    const data = req.body as BookmarkPayload;
    await addBookmarkService(req.user!.uid, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Bookmark added",
    );
}

export const removeBookmarkController = async (req:Request, res:Response)=>{
    const data = req.body as BookmarkPayload;
    await removeBookmarkService(req.user!.uid, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Bookmark removed",
    );
}

export const isBookmarkedController = async (req:Request, res:Response)=>{
    const data = req.body as BookmarkPayload;
    const bookmarked = await isBookmarkedService(req.user!.uid, data);
    const response:IsBookmarkedResponse = {
        bookmarked
    };
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Bookmark status fetched",
        response,
    );
}


export const fetchBookmarkedAnswersController = async (req:Request, res:Response)=>{
    const answers = await fetchBookmarkedAnswersService(req.user!.uid);
    const response:FetchBookmarkedAnswersResponse = {
        answers,
    };
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Fetched Bookmarked answers",
        response,
    );
}

export const fetchBookmarkedQuestionsController = async (req:Request, res:Response)=>{
    const questions = await fetchBookmarkedQuestionsService(req.user!.uid);
    const response:FetchBookmarkedQuestionsResponse = {
        questions,
    }
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Fetched Bookmarked answers",
        response,
    );
}