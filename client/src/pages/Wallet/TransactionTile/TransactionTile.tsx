import TransactionTileStyle from "./TransactionTile.module.css";
import { useAppSelector } from "../../../hooks/store.hook";
import { formatDate, formatTime } from "../../../utils/formatDateTime.util";
import UserIcon from "../../../assets/images/user.png";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";

interface TransactionTileProps{
    transaction: any,
}

export const TransactionTile:React.FC<TransactionTileProps> = ({transaction})=>{
    const user = useAppSelector(state=>state.auth.user);
    const other = (transaction.sender._id==user?._id)? transaction.receiver:transaction.sender;

    const {safeNavigate} = useSafeNavigate();

    return (
        <div className={TransactionTileStyle["container"]}>
            <div className={TransactionTileStyle["time"]}>
                <div className={TransactionTileStyle["date"]}>{formatDate(transaction.createdAt)}</div>
                <div className={TransactionTileStyle["exact-time"]}>{formatTime(transaction.createdAt)}</div>
            </div>
            <div className={TransactionTileStyle["transaction-id"]}>#{(transaction._id).slice(14)}</div>
            <div onClick={()=>safeNavigate(homeRoutes.profile+`/${other.userName}`)} className={TransactionTileStyle["other-party"]}>
                <img src={other?.profile??UserIcon} className={TransactionTileStyle["user-profile"]}/>
                {/* <div className={TransactionTileStyle["user-profile"]}>
                </div> */}
                <div className={TransactionTileStyle["user-data"]}>{other.firstName} {other.lastName}</div>
            </div>
            <div className={`${TransactionTileStyle["amount"]} ${transaction.receiver._id == user?._id? TransactionTileStyle["received"]:""}`}>
                {
                    transaction.receiver._id == user?._id? "+":"-"
                }{transaction.amount}
            </div>
        </div>
    )
}