import { formatDate } from "../../../utils/formatDateTime.util";
import TimelineTileStyle from "./TimelineTile.module.css";

interface TimelineTileProps{
    time : Date;
}

export const TimelineTile:React.FC<TimelineTileProps> = ({time})=>{
    return (
        <div className={TimelineTileStyle["container"]}>
            <div className={TimelineTileStyle["timeline"]}>{formatDate(time)}</div>
        </div>
    );
}