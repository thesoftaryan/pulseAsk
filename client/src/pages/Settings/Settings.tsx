import { useState } from "react";
import { RoundedButton } from "../../components/common/RoundedButton/RoundedButton";
import SettingsStyle from "./Settings.module.css";
import { AccountSettings } from "./AccountSettings/AccountSettings";
import { PaymentSettings } from "./PaymentSettings/PaymentSettings";
import { NotificationSettings } from "./NotificationSettings/NotificationSettings";
import { ChatSettings } from "./ChatSettings/ChatSettings";

type SettingsType = "account" | "payment" | "notifications" | "chat";

export const Settings = ()=>{

    const [activeSettingsType, setActiveSettingsType] = useState<SettingsType>("account");

    return (
        <div className={SettingsStyle["container"]}>
            <div className={SettingsStyle["header-section"]}>
                <div className={SettingsStyle["header-title"]}>
                    Settings
                </div>
                <div className={SettingsStyle["header-message"]}>
                    Manage your preferences and account
                </div>
            </div>
            <div className={SettingsStyle["settings-section"]}>
                <RoundedButton text="Account" active={activeSettingsType==="account"} onClick={()=>setActiveSettingsType("account")}/>
                <RoundedButton text="Payment" active={activeSettingsType==="payment"} onClick={()=>setActiveSettingsType("payment")}/>
                <RoundedButton text="Notifications" active={activeSettingsType==="notifications"} onClick={()=>setActiveSettingsType("notifications")}/>
                <RoundedButton text="Chat" active={activeSettingsType==="chat"} onClick={()=>setActiveSettingsType("chat")}/>
            </div>
            <div className={SettingsStyle["settings-section-page"]}>
                {
                    activeSettingsType==="account"
                    &&
                    <AccountSettings/>
                }
                {
                    activeSettingsType==="payment"
                    &&
                    <PaymentSettings/>
                }
                {
                    activeSettingsType==="notifications"
                    &&
                    <NotificationSettings/>
                }
                {
                    activeSettingsType==="chat"
                    &&
                    <ChatSettings/>
                }
            </div>
        </div>
    );
}