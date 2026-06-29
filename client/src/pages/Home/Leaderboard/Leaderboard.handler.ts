import { useState } from "react";
import { parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { getLeaderboardService } from "../../../services/leaderboard.service";


export const useLeaderboardHandler = (
    setEntries: React.Dispatch<React.SetStateAction<any[]>>,
)=>{

    const [fetching, setFetching] = useState(false);

    const getLeaderboardHandler = async ()=>{
        try{
            setFetching(true);
            const response = await getLeaderboardService();
            const result = parseSuccessResponse<any>(response);
            setEntries(result.data.leaderboard);
        }catch(error){
            // don't want the user to see the error
        }finally{
            setFetching(false);
        }
    }
    return {
        fetching,
        getLeaderboardHandler,
    }
}