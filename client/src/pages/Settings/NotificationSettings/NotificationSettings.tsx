import { useState } from "react";
import Divider from "../../../components/common/Divider/Divider";
import { PreferenceTile } from "../PreferenceTile/PreferenceTile";
import NotificationSettingsStyle from "./NotificationSettings.module.css";

export const NotificationSettings = ()=>{

    const notificationsState = {
        answerNotifications : useState(false),
        chatNotifications : useState(false),
        paymentNotifications : useState(false),
        announcementNotifications : useState(false),
        promotionalNotifications : useState(false),
    }

    return (
        <div className={NotificationSettingsStyle["container"]}>
            <Divider text="Set your notification preferences"/>
            <div className={NotificationSettingsStyle["preferences"]}>
                <PreferenceTile text="Answer Notifications" active={notificationsState.answerNotifications[0]} setActive={notificationsState.answerNotifications[1]}/>
                <PreferenceTile text="Chat Notifications" active={notificationsState.chatNotifications[0]} setActive={notificationsState.chatNotifications[1]}/>
                <PreferenceTile text="Payment Notifications" active={notificationsState.paymentNotifications[0]} setActive={notificationsState.paymentNotifications[1]}/>
                <PreferenceTile text="Announcements Notifications" active={notificationsState.announcementNotifications[0]} setActive={notificationsState.announcementNotifications[1]}/>
                <PreferenceTile text="Promotional Notifications" active={notificationsState.promotionalNotifications[0]} setActive={notificationsState.promotionalNotifications[1]}/>

            </div>
        </div>
    );
}