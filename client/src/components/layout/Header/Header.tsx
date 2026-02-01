import { useEffect, useRef, useState } from "react";

import { UserProfile } from "../../common/UserProfile/UserProfile";

import HeaderStyle from "./Header.module.css";
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
import { logoutThunk } from "../../../store/auth/thunks/logout.thunk";
import { useNavigate } from "react-router-dom";
import { authRoutes } from "../../../routes/routesConstants";


export const Header = ()=>{

    const theme = useAppSelector(state=>state.theme.theme);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const handleClickOutside = (event : MouseEvent)=>{
            if(profileRef.current && !profileRef.current.contains(event.target as Node)){
                setIsProfileOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleLogout = async ()=>{
        try{
            dispatch(logoutThunk()).unwrap();
            navigate(authRoutes.login, {replace:true});
        }catch(error){
            console.log("logout : ", error);
        }
    }

    return (
        <>
            <header className={HeaderStyle["header"]}>
                <PulseAskIcon className={HeaderStyle["site-icon"]}/>
                <div className={HeaderStyle["left-container"]}>
                    <HomeIcon className={HeaderStyle["icon"]}/>
                    <TagIcon className={HeaderStyle["icon"]}/>
                </div>
                <div className={HeaderStyle["middle-container"]}>
                    <div className={HeaderStyle["search-box"]}>
                        <input type="text" placeholder="Search for questions, answer, persons..." className={HeaderStyle["search-input"]}>
                            
                        </input>
                        <div className={HeaderStyle["search-icon-container"]}>
                            <SearchIcon className={HeaderStyle["search-icon"]}/>
                        </div>
                    </div>
                </div>
                <div className={HeaderStyle["right-container"]}>
                    {theme === "light"? <LightTheme onClick={()=>{dispatch(toggleTheme())}} className={HeaderStyle["icon"]}/>:<DarkTheme onClick={()=>{dispatch(toggleTheme())}} className={HeaderStyle["icon"]}/>}
                    <NotificationIcon className={HeaderStyle["icon"]}/>
                    <MessageIcon className={HeaderStyle["icon"]}/>
                    <div ref={profileRef} className={HeaderStyle["profile-wrapper"]}>
                        <UserProfile className={HeaderStyle["user-profile"]} onClick={()=>{setIsProfileOpen((isOpen)=>!isOpen)}}/>
                        {
                            isProfileOpen && (
                            <div className={HeaderStyle["user-action"]}>
                                <ul>
                                    <li>Profile</li>
                                    <li>Settings</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </ul>
                            </div>
                            )
                        }
                    </div>
                </div>
            </header>
        </>
    );
}