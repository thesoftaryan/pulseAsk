import NotificationTileStyle from "./NotificationTile.module.css";

import ChevronLeftIcon from "../../../../../assets/icons/Chevron left.svg?react";
import { formatDate, formatTime } from "../../../../../utils/formatDateTime.util";
import { useSafeNavigate } from "../../../../../hooks/useSafeNavigate.hook";

interface NotificationTileProps{
    notification: any;
}

export const NotificationTile : React.FC<NotificationTileProps> = ({notification})=>{
    const {safeNavigate} = useSafeNavigate();
    return (
        <div  className={NotificationTileStyle["container"]}>
            <div  className={NotificationTileStyle["left"]}>
                {<p>{formatDate(notification.sentAt)}</p>}
                <div  className={NotificationTileStyle["time"]}>
                    {<p>{formatTime(notification.sentAt)}</p>}
                </div>
            </div>
            <div  className={NotificationTileStyle["separator"]}></div>
            <div  className={NotificationTileStyle["notification"]}>
                <div  className={NotificationTileStyle["notification-type"]}>{notification.title}</div>
                <div  className={NotificationTileStyle["notification-message"]}>{notification.content}</div>
            </div>
            <div  className={NotificationTileStyle["right"]}>
                <div onClick={()=>safeNavigate(notification.actionUrl)} className={NotificationTileStyle["action"]}>View Now</div>
                <ChevronLeftIcon  className={NotificationTileStyle["icon"]}/>
            </div>
            {
                !notification.isRead
                &&
                <div  className={NotificationTileStyle["unread"]}></div>
            }
        </div>
    )
}