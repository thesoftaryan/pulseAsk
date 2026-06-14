import { formatDate } from "../../../utils/formatDateTime.util";
import TransactionTileStyle from "./TransactionTile.module.css";

export const TransactionTile = ()=>{
    return (
        <div className={TransactionTileStyle["container"]}>
            <div className="time">{formatDate(new Date(Date.now()))}</div>
            <div className="transaction-id">s23io2939dk</div>
            <div className="other-party">Aryan Maurya</div>
            <div className="amount">120</div>
        </div>
    )
}