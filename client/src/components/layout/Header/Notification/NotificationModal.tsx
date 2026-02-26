import NotificationModalStyle from "./NotificationModal.module.css";
import { NotificationTile } from "./NotificationTile/NotificationTile";

export const NotificationModal = ()=>{
    return (
        <div className={NotificationModalStyle["container"]}>
            <div className={NotificationModalStyle["title"]}>
                Notifications
            </div>
            <div className={NotificationModalStyle["notifications"]}>
                <NotificationTile/>
                <NotificationTile/>
                <NotificationTile/>                
                <NotificationTile/>
                <NotificationTile/>                
                <NotificationTile/>
                <NotificationTile/>
            </div>
        </div>
    );
}