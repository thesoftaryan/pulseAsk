import WalletStyle from "./Wallet.module.css";
import { useEffect, useState } from "react";
import Divider from "../../components/common/Divider/Divider";
import { TransactionTile } from "./TransactionTile/TransactionTile";
import { useWalletHandler } from "./Wallet.handler";

export const Wallet = ()=>{
    const [walletStats, setWalletStats] = useState<any>({});
    const [transactions, setTransactions] = useState<any[]>([]);

    const {getWalletStatsHandler, getTransactionsHandler} 
    = useWalletHandler(
        setWalletStats,
        setTransactions,
    );

    useEffect(()=>{
        getWalletStatsHandler();
        getTransactionsHandler();
    }, []);

    return (
        <div className={WalletStyle["wallet-container"]}>
            <div className={WalletStyle["wallet-stats"]}>
                <div className={WalletStyle["wallet-balance"]}>
                    <div className={WalletStyle["heading"]}>
                        PulsePoints
                    </div>
                    <div className={WalletStyle["balance"]}>
                        {walletStats.balance}
                    </div>
                </div>
                <div className={WalletStyle["vertical-divider"]}></div>
                <div className={WalletStyle["wallet-transaction-amount"]}>
                    <div className={WalletStyle["amount-label"]}>Total points sent</div>
                    <div className={WalletStyle["amount"]}>{walletStats.totalSent}</div>
                    <div className={WalletStyle["divider"]}>
                        <Divider/>
                    </div>
                    <div className={WalletStyle["amount-label"]}>Total points received</div>
                    <div className={WalletStyle["amount"]}>{walletStats.totalReceived}</div>
                    
                </div>
            </div>
            <div className={`${WalletStyle["divider"]} ${WalletStyle["margin-top"]}`}>
                <Divider text="Transaction History"/>
            </div>
            <div className={WalletStyle["transactions-container"]}>
                {/* <TransactionTile received={true} amount={5000}/>
                <TransactionTile received={false}/> */}
                {
                    !transactions.length
                    &&
                    <p className={WalletStyle["label"]}>No Transaction found</p>
                }
                {
                    transactions.map((transaction)=>{
                        return <TransactionTile key={transaction._id} transaction={transaction}/>;
                    })
                }
            </div>
        </div>
    );
}