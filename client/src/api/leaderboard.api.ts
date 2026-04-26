import api from "./axios";

export const getLeaderboardAPI = ()=>{
    return api.get("/leaderboard/getLeaderboard");
}