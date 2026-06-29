import { useState } from "react";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service"
import { getTransactionsService, getWalletStatsService } from "../../services/wallet.service";
import { showToast } from "../../utils/toast.util";

export const useWalletHandler = (
    setWalletStats: React.Dispatch<any>,
    setTransactions: React.Dispatch<React.SetStateAction<any[]>>,
)=>{
    const [fetchingWallet, setFetchingWallet] = useState(false);
    const [fetchingTransactions, setFetchingTransactions] = useState(false);
    const getWalletStatsHandler = async ()=>{
        try{
            setFetchingWallet(true);
            const response = await getWalletStatsService();
            const result = parseSuccessResponse<any>(response);
            setWalletStats(result.data)
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }finally{
            setFetchingWallet(false);
        }
    }

    const getTransactionsHandler = async ()=>{
        try{
            setFetchingTransactions(true);
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
            showToast.error(error.message);
        }finally{
            setFetchingTransactions(false);
        }
    }

    return {
        fetchingWallet,
        fetchingTransactions,
        getWalletStatsHandler,
        getTransactionsHandler,
    }
}