import { SearchBar } from "../../components/layout/SearchBar/SearchBar";
import ChatStyle from "./Chat.module.css";
import { PersonTile } from "./PersonTile/PersonTile";


import UserImage from "../../assets/images/user.png";

import SendIcon from "../../assets/icons/general/send.svg?react";
import AttachmentIcon from "../../assets/icons/general/attachment.svg?react";
import BanIcon from "../../assets/icons/general/ban.svg?react";
import SearchIcon from "../../assets/icons/header/search.svg?react";
import ReportUserIcon from "../../assets/icons/general/report_user.svg?react";


export const Chat = ()=>{
    return (
        <div className={ChatStyle["container"]}>
            <div className={ChatStyle["left"]}>
                <div className={ChatStyle["label"]}>
                    Persons
                </div>
                <div className={ChatStyle["search-bar"]}>
                    <SearchBar placeholder="Search for Persons" level1={true}/>
                </div>
                <div className={ChatStyle["persons"]}>
                    <PersonTile/>
                    <PersonTile active={true}/>
                    <PersonTile/>
                </div>
            </div>
            <div className={ChatStyle["right"]}>
                <div className={ChatStyle["header"]}>
                    <div className={ChatStyle["person-profile-status"]}>
                        <div className={ChatStyle["person-profile-container"]}>
                            <img src={UserImage} className={ChatStyle["person-profile"]}/>
                        </div>
                        <div className={ChatStyle["person-data"]}>
                            <div className={ChatStyle["person-name"]}>Aryan Maurya</div>
                            <div className={ChatStyle["person-status"]}>Last seen at 1:45 <span className={ChatStyle["time-specifier"]}>pm</span> </div>
                        </div>
                    </div>
                    <div className={ChatStyle["person-actions"]}>
                        <SearchIcon/>
                        <ReportUserIcon/>
                        <BanIcon/>
                    </div>
                </div>
                <div className={ChatStyle["messages"]}>
                    
                </div>
                <div className={ChatStyle["message-input-container"]}>
                    <div className={ChatStyle["message-attachment"]}>
                        <AttachmentIcon/>
                    </div>
                    <input type="text" placeholder="Enter your message" className={ChatStyle["message-input"]}>
                        
                    </input>
                    <div className={ChatStyle["message-send"]}>
                        <SendIcon/>
                    </div>
                </div>
            </div>
        </div>
    );
}