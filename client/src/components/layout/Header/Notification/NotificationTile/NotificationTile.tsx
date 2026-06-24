import NotificationTileStyle from "./NotificationTile.module.css";

import ChevronLeftIcon from "../../../../../assets/icons/Chevron left.svg?react";
import { formatDate, formatTime } from "../../../../../utils/formatDateTime.util";
import { useSafeNavigate } from "../../../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../../../routes/routesConstants";

interface NotificationTileProps{
    notification: any;
    markAsRead: (notificationId: string) => Promise<void>;
}

export const NotificationTile : React.FC<NotificationTileProps> = ({notification, markAsRead})=>{
    const {safeNavigate} = useSafeNavigate();
    const userName = ((notification.content as string).split(" "))[0];
    return (
        <div  className={NotificationTileStyle["container"]}>
            <div  className={NotificationTileStyle["left"]}>
                <div className={NotificationTileStyle["date"]}>
                    {formatDate(notification.sentAt)}
                </div>
                <div  className={NotificationTileStyle["time"]}>
                    {formatTime(notification.sentAt)}
                </div>
            </div>
            <div  className={NotificationTileStyle["separator"]}></div>
            <div  className={NotificationTileStyle["notification"]}>
                <div  className={NotificationTileStyle["notification-type"]}>{notification.title}</div>
                <div  className={NotificationTileStyle["notification-message"]} onClick={()=>safeNavigate(homeRoutes.profile+`/${userName}`)}>{notification.content}</div>
            </div>
            {
                notification.actionUrl
                &&
                <div onClick={()=>{safeNavigate(notification.actionUrl, true); if(!notification.isRead)markAsRead(notification._id);}} className={NotificationTileStyle["right"]}>
                    {/* <div onClick={()=>safeNavigate(notification.actionUrl)} className={NotificationTileStyle["action"]}></div> */}
                    <ChevronLeftIcon  className={NotificationTileStyle["icon"]}/>
                </div>
            }
            {
                !notification.isRead
                &&
                <div  className={NotificationTileStyle["unread"]}></div>
            }
        </div>
    )
}