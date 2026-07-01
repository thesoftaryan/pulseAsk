import mongoose, { Types } from "mongoose";
import { STATUS } from "../constants/statusCodes.constants";
import { Leaderboard } from "../models/Leaderboard.model";
import { User } from "../models/User.model";
import { ApiError } from "../utils/error.util";


/**
 * 
 * @param uid user Id for which leaderboad has to be updated 
 */
export const updateLeaderboardService = async (uid:Types.ObjectId)=>{
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const user = await User.findById(uid).session(session);
        if(!user){
            throw new ApiError(
                STATUS.CLIENT_ERROR.NOT_FOUND,
                "User not found",
            );
        }
        const newScore = user.reputationScore;
        await Leaderboard.updateOne(
            {uid},
            {$set : {reputationScore: newScore}},
            {upsert: true, session}
        );

        const topUsers = await Leaderboard.find()
        .sort({reputationScore:-1})
        .limit(10)
        .session(session);

        const topIds = topUsers.map((u)=>u._id);

        await Leaderboard.deleteMany({
            _id: {$nin: topIds},
        }).session(session);

        await session.commitTransaction();
    }catch(error){
        await session.abortTransaction();
        throw new ApiError(
            STATUS.SERVER_ERROR.INTERNAL,
            "Some error occurred",
        );
    } finally{
        session.endSession();
    }
};


/**
 * 
 * @returns Leaderboard
 */
export const getLeaderboardService = async ()=>{
    const leaderboard = await Leaderboard.find().populate(
        {path:"uid", select:"_id userName profile firstName lastName reputationScore"}
    ).sort({reputationScore:-1});
    return leaderboard;
}