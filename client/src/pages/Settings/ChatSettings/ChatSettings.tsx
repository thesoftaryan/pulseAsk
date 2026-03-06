import { useState } from "react";
import Divider from "../../../components/common/Divider/Divider";
import { PreferenceTile } from "../PreferenceTile/PreferenceTile";
import ChatSettingsStyle from "./ChatSettings.module.css";

import ChevronleftIcon from "../../../assets/icons/Chevron left.svg?react";

export const ChatSettings = ()=>{
    const [enableMessage, setEnableMessage] = useState(true);
    return (
        <div className={ChatSettingsStyle["container"]}>
            <Divider text="Set your chat preferences"/>
            <div className={ChatSettingsStyle["preferences"]}>
                <PreferenceTile text="Answer Notifications" active={enableMessage} setActive={setEnableMessage}/>
                <div className={ChatSettingsStyle["blocked-user-container"]}>
                    <div className={ChatSettingsStyle["text"]}>See the users you have blocked</div>
                    <ChevronleftIcon className={ChatSettingsStyle["chevron-left"]}/>
                </div>
            </div>
        </div>
    );
}