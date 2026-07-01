import { TransactionInterface } from "../../models/Transaction.model";
import { WalletInterface } from "../../models/Wallet.model";

export interface WalletStatsResponse{
    wallet: WalletInterface;
}

export interface FetchTransactionsResponse{
    transactions: TransactionInterface[];
}