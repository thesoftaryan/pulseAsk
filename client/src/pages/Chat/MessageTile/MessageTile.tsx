import type { ChatMessageInterface } from "../../../types/ApiResponse/chat.type";
import { formatTime } from "../../../utils/formatDateTime.util";
import MessageTileStyle from "./MessageTile.module.css";

export interface MessageTileProps{
    message : ChatMessageInterface;
    self : boolean;
}


export const MessageTile:React.FC<MessageTileProps> = ({message, self})=>{
    return (
        <div className={`${MessageTileStyle["container"]}`}>
            <div className={`${MessageTileStyle["message-container"]}  ${self? MessageTileStyle["self"]:""} ${message.type==="image"? MessageTileStyle["image-style"]:""}`}>
                
                {
                    message.type==="image"
                    &&
                    <img src={message.content} className={MessageTileStyle["message-image"]}/>
                }

                <div className={MessageTileStyle["message"]}>
                    {message.type==="image"? message.caption:message.content}
                </div>
                <div className={`${MessageTileStyle["time"]}  ${self? MessageTileStyle["time-self"]:""}`}>
                    {formatTime(message.sentAt)}
                </div>
            </div>
        </div>
    );
}