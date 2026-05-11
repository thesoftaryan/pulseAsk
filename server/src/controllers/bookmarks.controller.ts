import { Request, Response } from "express";
import { addBookmarkService, fetchBookmarkedAnswersService, fetchBookmarkedQuestionsService, isBookmarkedService, removeBookmarkService } from "../services/bookmarks.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";


export const addBookmarkController = async (req:Request, res:Response)=>{
    await addBookmarkService(req.user!.uid, req.body);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Bookmark added",
    );
}

export const removeBookmarkController = async (req:Request, res:Response)=>{
    await removeBookmarkService(req.user!.uid, req.body);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Bookmark removed",
    );
}

export const isBookmarkedController = async (req:Request, res:Response)=>{
    const bookmarked = await isBookmarkedService(req.user!.uid, req.body);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Bookmark status fetched",
        {
            bookmarked,
        }
    );
}


export const fetchBookmarkedAnswersController = async (req:Request, res:Response)=>{
    const answers = await fetchBookmarkedAnswersService(req.user!.uid);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Fetched Bookmarked answers",
        {
            answers,
        }
    );
}

export const fetchBookmarkedQuestionsController = async (req:Request, res:Response)=>{
    const questions = await fetchBookmarkedQuestionsService(req.user!.uid);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Fetched Bookmarked answers",
        {
            questions,
        }
    );
}