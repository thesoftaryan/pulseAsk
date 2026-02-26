import NotificationTileStyle from "./NotificationTile.module.css";

import ChevronLeftIcon from "../../../../../assets/icons/Chevron left.svg?react";

export const NotificationTile = ()=>{
    return (
        <div  className={NotificationTileStyle["container"]}>
            <div  className={NotificationTileStyle["left"]}>
                <div  className={NotificationTileStyle["date"]}>Mon, 25</div>
                <div  className={NotificationTileStyle["month"]}>August</div>
                <div  className={NotificationTileStyle["time"]}>
                    <div  className={NotificationTileStyle["time-value"]}>4:45</div>
                    <div  className={NotificationTileStyle["time-specifier"]}>PM</div>
                </div>
            </div>
            <div  className={NotificationTileStyle["separator"]}></div>
            <div  className={NotificationTileStyle["notification"]}>
                <div  className={NotificationTileStyle["notification-type"]}>Donation Received</div>
                <div  className={NotificationTileStyle["notification-message"]}>Received a donation of 500$ from Aryan Maurya</div>
            </div>
            <div  className={NotificationTileStyle["right"]}>
                <div className={NotificationTileStyle["action"]}>View Now</div>
                <ChevronLeftIcon  className={NotificationTileStyle["icon"]}/>
            </div>
            <div  className={NotificationTileStyle["unread"]}></div>
        </div>
    )
}