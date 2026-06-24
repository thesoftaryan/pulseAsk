import { useState } from "react";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service"
import { getTransactionsService, getWalletStatsService } from "../../services/wallet.service";

export const useWalletHandler = (
    setWalletStats: React.Dispatch<any>,
    setTransactions: React.Dispatch<React.SetStateAction<any[]>>,
)=>{
    const [fetching, setFetching] = useState(false);
    const getWalletStatsHandler = async ()=>{
        try{
            setFetching(true);
            const response = await getWalletStatsService();
            const result = parseSuccessResponse<any>(response);
            setWalletStats(result.data)
        }catch(err){
            const error = parseErrorResponse(err);
            console.log(error.message);
        }finally{
            setFetching(false);
        }
    }

    const getTransactionsHandler = async ()=>{
        try{
            setFetching(true);
            const response = await getTransactionsService();
            const result = parseSuccessResponse<any>(response);
            let transactions  = result.data.transactions as Array<any>;
            transactions.sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            );

            setTransactions(transactions);
            // console.log(result.data.transactions);
        }catch(err){
            const error = parseErrorResponse(err);
            console.log(error.message);
        }finally{
            setFetching(false);
        }
    }

    return {
        fetching,
        getWalletStatsHandler,
        getTransactionsHandler,
    }
}