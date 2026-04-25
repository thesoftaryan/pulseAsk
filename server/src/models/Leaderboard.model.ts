
import { Schema, Types, model } from "mongoose";

export interface LeaderboardInterface{
    uid: Types.ObjectId;
    reputationScore: number;
}

const LeaderboardSchema = new Schema<LeaderboardInterface>({
    uid: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    reputationScore: {
        type: Number,
        required: true,
    }
});

LeaderboardSchema.index({uid:1}, {unique: true});
LeaderboardSchema.index({reputationScore: -1});

export const Leaderboard = model<LeaderboardInterface>("Leaderboard", LeaderboardSchema);