import { useState } from "react";
import Divider from "../../../components/common/Divider/Divider";
import { PreferenceTile } from "../PreferenceTile/PreferenceTile";
import NotificationSettingsStyle from "./NotificationSettings.module.css";
import type { NotificationPreferencesInterface } from "../../../types/ApiResponse/user.type";
import { useAppSelector } from "../../../hooks/store.hook";
import { useNotificationSettingsHandler } from "./NotificationSettings.handler";

export const NotificationSettings = ()=>{

    const user = useAppSelector(state=>state.auth.user);
    const initObj = {
        answer : true,
        chat : true,
        payment : true,
        announcement : true,
        promotional : true,
    }
    const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferencesInterface>(user?.notificationPreferences??initObj);

    const [updating, setUpdating] = useState(false);

    const {updateNotificationProfile} = useNotificationSettingsHandler(setNotificationPreferences);

    const handleNotificationSettingsChange = async (newState : NotificationPreferencesInterface)=>{
        setUpdating(true);
        await updateNotificationProfile(newState);
        setUpdating(false);
    }

    return (
        <div className={NotificationSettingsStyle["container"]}>
            <Divider text="Set your notification preferences"/>
            <div className={NotificationSettingsStyle["preferences"]}>
                <PreferenceTile onClick={updating?undefined:()=>{handleNotificationSettingsChange({...notificationPreferences, answer: !notificationPreferences.answer})}} text="Enable Answer Notifications" active={notificationPreferences.answer} />
                <PreferenceTile onClick={updating?undefined:()=>{handleNotificationSettingsChange({...notificationPreferences, chat: !notificationPreferences.chat})}} text="Enable Chat Notifications" active={notificationPreferences.chat} />
                <PreferenceTile onClick={updating?undefined:()=>{handleNotificationSettingsChange({...notificationPreferences, payment: !notificationPreferences.payment})}} text="Enable Payment Notifications" active={notificationPreferences.payment} />
                <PreferenceTile onClick={updating?undefined:()=>{handleNotificationSettingsChange({...notificationPreferences, announcement: !notificationPreferences.announcement})}} text="Enable Announcements Notifications" active={notificationPreferences.announcement} />
                <PreferenceTile onClick={updating?undefined:()=>{handleNotificationSettingsChange({...notificationPreferences, promotional: !notificationPreferences.promotional})}} text="Enable Promotional Notifications" active={notificationPreferences.promotional} />

            </div>
        </div>
    );
}