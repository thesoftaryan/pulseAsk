import { Request, Response } from "express";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { getLeaderboardService } from "../services/leaderboard.service";


export const getLeaderboardController = async (req: Request, res:Response)=>{
    const leaderboard = await getLeaderboardService();

    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Leaderboard fetched successfully",
        {
            leaderboard,
        }
    );
}