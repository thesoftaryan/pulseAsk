import mongoose, { Collection, Types } from "mongoose";
import { STATUS } from "../constants/statusCodes.constants";
import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { FetchProfilePayload} from "../types/profile.type";
import { FetchProfileResponse} from "../types/response/profile.type";
import { ApiError } from "../utils/error.util";
import { updateLeaderboardService } from "./leaderboard.service";


/**
 * @param data of type FetchProfilePayload
 * @returns user of type UserInterface
 */
export const fetchProfileService = async (data : FetchProfilePayload) : Promise<FetchProfileResponse> =>{
    const {userName} = data;

    const user = await User.findOne({userName});

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "User Not found",
        );
    }

    const questions = await Question.find({author: user._id}).populate([
        {path:"tags"},
        {path:"bestAnswer", populate:[
            {path:"author", select:"_id userName firstName lastName profile college"},
        ]},
    ]);
    const answers = await Answer.find({author: user._id}).populate([
        {path: "author", select:"_id userName firstName lastName profile college"},
        {path: "qid", select:"_id slug"},
    ]);

    const responseObj = {
        user,
        questions,
        answers,
    }

    return responseObj;
}


interface UserStatsUpdateInterface {
    reputationChange?: number;
    upvoteChange?: number;
    downvoteChange?: number;
    questionsAskedChange?: number;
    answersGivenChange?: number;
}

/**
 * 
 * @param uid user Id 
 * @param updates change in stats
 * @returns nothing
 */
export const updateUserStatsService = async (
    uid: Types.ObjectId, 
    updates: UserStatsUpdateInterface,
)=>{

    const {
        reputationChange = 0,
        upvoteChange = 0,
        downvoteChange = 0,
        questionsAskedChange = 0,
        answersGivenChange = 0,
    } = updates;

    await User.updateOne(
        {_id: uid},
        {
            $inc:{
                reputationScore: reputationChange,
                upvotes: upvoteChange,
                downvotes: downvoteChange,
                questionsAsked: questionsAskedChange,
                answersGiven: answersGivenChange,
            }
        }
    );

    updateLeaderboardService(uid);

    return;
}
