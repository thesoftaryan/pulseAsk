import TimelineTileStyle from "./TimelineTile.module.css";

export interface TimelineTileProps{
    time : string;
}

export const TimelineTile:React.FC<TimelineTileProps> = ({time})=>{
    return (
        <div className={TimelineTileStyle["container"]}>
            <div className={TimelineTileStyle["timeline"]}>{time}</div>
        </div>
    );
}