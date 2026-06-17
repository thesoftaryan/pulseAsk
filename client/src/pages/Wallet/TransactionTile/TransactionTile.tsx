import { formatDate } from "../../../utils/formatDateTime.util";
import TransactionTileStyle from "./TransactionTile.module.css";

interface TransactionTileProps{
    received: boolean,
    money?: number,
}

export const TransactionTile:React.FC<TransactionTileProps> = ({received, money=200})=>{
    return (
        <div className={TransactionTileStyle["container"]}>
            <div className={TransactionTileStyle["time"]}>{formatDate(new Date(Date.now()))}</div>
            <div className={TransactionTileStyle["transaction-id"]}>#s23io2939dk</div>
            <div className={TransactionTileStyle["other-party"]}>
                <div className={TransactionTileStyle["user-profile"]}>
                    
                </div>
                <div className={TransactionTileStyle["user-data"]}>Aryan Maurya</div>
            </div>
            <div className={`${TransactionTileStyle["amount"]} ${received? TransactionTileStyle["received"]:""}`}>
                {
                    received? "+":"-"
                }{money}
            </div>
        </div>
    )
}