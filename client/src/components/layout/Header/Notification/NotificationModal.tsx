import { useEffect, useState } from "react";
import NotificationModalStyle from "./NotificationModal.module.css";
import { NotificationTile } from "./NotificationTile/NotificationTile";
import { useNotificationModal } from "./NotificationModal.handler";

export const NotificationModal = ()=>{

    const [notifications, setNotifications] = useState<any[]>();
    const {fetchNotifications} = useNotificationModal(
        setNotifications,
    );

    useEffect(()=>{
        fetchNotifications();
    }, []);

    return (
        <div className={NotificationModalStyle["container"]}>
            <div className={NotificationModalStyle["title"]}>
                Notifications
            </div>
            <div className={NotificationModalStyle["notifications"]}>
                {
                    !notifications?.length
                    &&
                    <p className={NotificationModalStyle["label"]}>You don't have any notifications yet</p>
                }
                {
                    notifications?.map((notification)=>{
                        return <NotificationTile key={notification._id} notification={notification}/>
                    })
                }
            </div>
        </div>
    );
}