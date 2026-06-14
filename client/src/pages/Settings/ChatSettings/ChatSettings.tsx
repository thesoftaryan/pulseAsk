import { useState } from "react";
import Divider from "../../../components/common/Divider/Divider";
import { PreferenceTile } from "../PreferenceTile/PreferenceTile";
import ChatSettingsStyle from "./ChatSettings.module.css";

import ChevronleftIcon from "../../../assets/icons/Chevron left.svg?react";
import { useAppSelector } from "../../../hooks/store.hook";
import { useChatSettingsHandler } from "./ChatSettings.handler";
import type { ChatPreferencesInterface } from "../../../types/ApiResponse/user.type";

export const ChatSettings = ()=>{
    const user = useAppSelector(state=>state.auth.user);
    const initObj = {enableChat:true};
    const [chatPreferences, setChatPreferences] = useState<ChatPreferencesInterface>(user?.chatPreferences??initObj);
    
    const [updating, setUpdating] = useState(false);
    
    const {updateChatProfile} = useChatSettingsHandler(setChatPreferences);

    const handleChatSettingsChange = async ()=>{
        setUpdating(true);
        await updateChatProfile({enableChat: !chatPreferences.enableChat});
        setUpdating(false);
    }

    
    return (
        <div className={ChatSettingsStyle["container"]}>
            <Divider text="Set your chat preferences"/>
            <div className={ChatSettingsStyle["preferences"]}>
                <PreferenceTile onClick={updating?undefined:handleChatSettingsChange} text="Enable new users to message you" active={chatPreferences.enableChat}/>
                <div className={ChatSettingsStyle["blocked-user-container"]}>
                    <div className={ChatSettingsStyle["text"]}>See the users you have blocked</div>
                    <ChevronleftIcon className={ChatSettingsStyle["chevron-left"]}/>
                </div>
            </div>
        </div>
    );
}