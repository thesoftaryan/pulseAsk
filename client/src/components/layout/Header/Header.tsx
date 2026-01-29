import HeaderStyles from "./Header.module.css";
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";

import HomeIcon from "../../../assets/icons/header/home.svg?react";
import TagIcon from "../../../assets/icons/tag.svg?react"

import SearchIcon from "../../../assets/icons/header/search.svg?react";

import NotificationIcon from "../../../assets/icons/header/notification.svg?react";
import MessageIcon from "../../../assets/icons/header/message.svg?react";


export const Header = ()=>{
    return (
        <>
            <header className={HeaderStyles["header"]}>
                <PulseAskIcon className={HeaderStyles["site-icon"]}/>
                <div className={HeaderStyles["left-container"]}>
                    <HomeIcon className={HeaderStyles["icon"]}/>
                    <TagIcon className={HeaderStyles["icon"]}/>
                </div>
                <div className={HeaderStyles["middle-container"]}>
                    <div className={HeaderStyles["search-box"]}>
                        <input type="text" placeholder="Search for questions, answer, persons..." className={HeaderStyles["search-input"]}>
                            
                        </input>
                        <div className={HeaderStyles["search-icon-container"]}>
                            <SearchIcon className={HeaderStyles["search-icon"]}/>
                        </div>
                    </div>
                </div>
                <div className={HeaderStyles["right-container"]}>
                    <NotificationIcon className={HeaderStyles["icon"]}/>
                    <MessageIcon className={HeaderStyles["icon"]}/>
                    <MessageIcon className={HeaderStyles["icon"]}/>
                </div>
            </header>
        </>
    );
}