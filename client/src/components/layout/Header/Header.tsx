import { UserProfile } from "../../common/UserProfile/UserProfile";

import HeaderStyles from "./Header.module.css";
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";

import HomeIcon from "../../../assets/icons/header/home.svg?react";
import TagIcon from "../../../assets/icons/tag.svg?react"

import SearchIcon from "../../../assets/icons/header/search.svg?react";

import NotificationIcon from "../../../assets/icons/header/notification.svg?react";
import MessageIcon from "../../../assets/icons/header/message.svg?react";

import LightTheme from "../../../assets/icons/header/lightTheme.svg?react";
import DarkTheme from "../../../assets/icons/header/darkTheme.svg?react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store.hooks";

import { toggleTheme } from "../../../store/theme/theme.slice";


export const Header = ()=>{

    const theme = useAppSelector(state=>state.theme.theme);
    const dispatch = useAppDispatch();

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
                    {theme === "light"? <LightTheme onClick={()=>{dispatch(toggleTheme())}} className={HeaderStyles["icon"]}/>:<DarkTheme onClick={()=>{dispatch(toggleTheme())}} className={HeaderStyles["icon"]}/>}
                    <NotificationIcon className={HeaderStyles["icon"]}/>
                    <MessageIcon className={HeaderStyles["icon"]}/>
                    <div className="user-profile">
                        <UserProfile/>
                        <div className={HeaderStyles["user-action"]}>
                            <ul>
                                <li>Profile</li>
                                <li>Settings</li>
                                <li>Something</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}