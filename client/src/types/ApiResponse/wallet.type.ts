import type { UserInterface } from "./user.type";

export interface TransactionInterface{
    _id: string;
    sender: Partial<UserInterface>;
    receiver: Partial<UserInterface>;
    createdAt: Date;
    amount: number;
}

export interface WalletInterface{
    balance: number;
    totalSent: number;
    totalReceived: number;
}

export interface WalletStatsResponse{
    wallet: WalletInterface;
}

export interface FetchTransactionsResponse{
    transactions: TransactionInterface[];
}