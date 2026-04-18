import { formatTime } from "../../../utils/formatDateTime.util";
import MessageTileStyle from "./MessageTile.module.css";

export interface MessageTileProps{
    message : string;
    time : Date;
    self : boolean;
}


export const MessageTile:React.FC<MessageTileProps> = ({message, time, self})=>{
    return (
        <div className={`${MessageTileStyle["container"]}`}>
            <div className={`${MessageTileStyle["message-container"]}  ${self? MessageTileStyle["self"]:""}`}>
                <div className={MessageTileStyle["message"]}>
                    {message}
                </div>
                <div className={`${MessageTileStyle["time"]}  ${self? MessageTileStyle["time-self"]:""}`}>
                    {formatTime(time)}
                </div>
            </div>
        </div>
    );
}