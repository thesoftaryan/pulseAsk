import Divider from "../../components/common/Divider/Divider";
import { TransactionTile } from "./TransactionTile/TransactionTile";
import WalletStyle from "./Wallet.module.css";

export const Wallet = ()=>{
    return (
        <div className={WalletStyle["wallet-container"]}>
            <div className={WalletStyle["wallet-stats"]}>
                <div className={WalletStyle["wallet-balance"]}>
                    <div className={WalletStyle["heading"]}>
                        PulsePoints
                    </div>
                    <div className={WalletStyle["balance"]}>
                        4728
                    </div>
                </div>
                <div className={WalletStyle["vertical-divider"]}></div>
                <div className={WalletStyle["wallet-transaction-amount"]}>
                    <div className={WalletStyle["amount-label"]}>Total points sent</div>
                    <div className={WalletStyle["amount"]}>2819</div>
                    <div className={WalletStyle["divider"]}>
                        <Divider/>
                    </div>
                    <div className={WalletStyle["amount-label"]}>Total points received</div>
                    <div className={WalletStyle["amount"]}>7547</div>
                    
                </div>
            </div>
            <div className={`${WalletStyle["divider"]} ${WalletStyle["margin-top"]}`}>
                <Divider text="Transaction History"/>
            </div>
            <div className={WalletStyle["transactions-container"]}>
                <TransactionTile received={true} money={5000}/>
                <TransactionTile received={false}/>
            </div>
        </div>
    );
}