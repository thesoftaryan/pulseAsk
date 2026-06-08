import { useEffect, useState } from "react";
import NotificationModalStyle from "./NotificationModal.module.css";
import { NotificationTile } from "./NotificationTile/NotificationTile";
import { useNotificationModal } from "./NotificationModal.handler";
import { Spinner } from "../../../common/Spinner/Spinner";

interface NotificationModalProps{
    notifications: any[],
    setNotifications: React.Dispatch<React.SetStateAction<any[]>>,
}

export const NotificationModal:React.FC<NotificationModalProps> = ({
    notifications,
    setNotifications,
})=>{

    const [fetching, setFetching] = useState(false);
    // const [notifications, setNotifications] = useState<any[]>([]);
    const {fetchNotifications, markNotificationAsSeenHandler} = useNotificationModal(
        setNotifications,
        setFetching,
    );

    useEffect(()=>{
        fetchNotifications();
    }, []);

    return (
        <div className={NotificationModalStyle["container"]}>
            <div className={NotificationModalStyle["title"]}>
                Notifications
            </div>
            {
                fetching
                &&
                <Spinner/>
            }
            <div className={NotificationModalStyle["notifications"]}>
                {
                    !fetching &&
                    !notifications?.length
                    &&
                    <p className={NotificationModalStyle["label"]}>You don't have any notifications yet</p>
                }
                {
                    notifications?.map((notification)=>{
                        return <NotificationTile markAsRead={markNotificationAsSeenHandler} key={notification._id} notification={notification}/>
                    })
                }
            </div>
        </div>
    );
}