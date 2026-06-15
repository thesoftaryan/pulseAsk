import Divider from "../../components/common/Divider/Divider";
import { TransactionTile } from "./TransactionTile/TransactionTile";
import WalletStyle from "./Wallet.module.css";

export const Wallet = ()=>{
    return (
        <div className={WalletStyle["wallet-container"]}>
            <div className="wallet-stats">
                <div className="wallet-balance"></div>
                <div className="wallet-transaction-count">
                    <div className="count-label"></div>
                    <div className="amount"></div>
                    <Divider/>
                    <div className="count-label"></div>
                    <div className="amount"></div>
                    
                </div>
            </div>
            <Divider text="Transaction History"/>
            <div className="transactions-container">
                <TransactionTile received={true}/>
                <TransactionTile received={false}/>
            </div>
        </div>
    );
}