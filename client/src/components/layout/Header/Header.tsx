import HeaderStyle from "./Header.module.css";

import { useEffect, useRef, useState } from "react";

import { UserProfile } from "../../common/UserProfile/UserProfile";

import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";

import HomeIcon from "../../../assets/icons/header/home.svg?react";
// import TagIcon from "../../../assets/icons/tag.svg?react"

import NotificationIcon from "../../../assets/icons/header/notification.svg?react";
import MessageIcon from "../../../assets/icons/header/message.svg?react";

import LightTheme from "../../../assets/icons/header/lightTheme.svg?react";
import DarkTheme from "../../../assets/icons/header/darkTheme.svg?react";
import { useAppDispatch, useAppSelector } from "../../../hooks/store.hook";

import { toggleTheme } from "../../../store/theme/theme.slice";
import { logoutThunk } from "../../../store/auth/thunks/logout.thunk";
import { authRoutes, homeRoutes } from "../../../routes/routesConstants";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { NotificationModal } from "./Notification/NotificationModal";
import { SearchBar } from "../SearchBar/SearchBar";
import { updateUnreadNotificationCount } from "../../../store/auth/auth.slice";
import { getSocket } from "../../../services/socket.service";


export const Header = ()=>{

    const user = useAppSelector(state=>state.auth.user);
    const theme = useAppSelector(state=>state.theme.theme);

    const dispatch = useAppDispatch();
    
    const {safeNavigate, replaceNavigate} = useSafeNavigate();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
        const handleClickOutside = (event : MouseEvent)=>{
            if(profileRef.current && !profileRef.current.contains(event.target as Node)){
                setIsProfileOpen(false);
            }
            if(notificationRef.current && !notificationRef.current.contains(event.target as Node)){
                setIsNotificationOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);


    // registering for socket notification
    const [notifications, setNotifications] = useState<any[]>([]);    
    const socket = getSocket();
    useEffect(()=>{
        if(!socket) return;
        
        const handler = (data: any) => {
            // console.log("Received a new notification");
            dispatch(updateUnreadNotificationCount({change: 1}));
            setNotifications(prev => [data, ...prev]);
        };
        socket.on("notification:new", handler);
        return () => {
            socket.off("notification:new", handler);
        };
    }, [socket]);

    const handleLogout = async ()=>{
        try{
            await dispatch(logoutThunk()).unwrap();
            replaceNavigate(authRoutes.login);
        }catch(error){
            console.log("logout : ", error);
        }
    }

    const handleSearchSubmit = ()=>{
        safeNavigate(homeRoutes.search+`?query=${searchText}`);
    }

    return (
        <>
            <header className={HeaderStyle["header"]}>
                <PulseAskIcon className={HeaderStyle["site-icon"]}/>
                <div className={HeaderStyle["left-container"]}>
                    <HomeIcon className={HeaderStyle["icon"]} onClick={()=>{safeNavigate(homeRoutes.home)}}/>
                    <div className={HeaderStyle["message-icon-wrapper"]}>
                        <MessageIcon className={HeaderStyle["icon"]} onClick={()=>{safeNavigate(homeRoutes.chat)}}/>
                        {
                            ((Boolean)(user?.unreadChatCount))
                            &&
                            <div className={HeaderStyle["unread-indicator"]}></div>
                        }
                    </div>
                    {/* <TagIcon className={HeaderStyle["icon"]}  onClick={()=>{safeNavigate(homeRoutes.tag)}}/> */}
                </div>
                <div className={HeaderStyle["middle-container"]}>
                    <SearchBar onSubmit={handleSearchSubmit} setSearchText={setSearchText}/>
                </div>
                <div className={HeaderStyle["right-container"]}>
                    {theme === "light"? <LightTheme onClick={()=>{dispatch(toggleTheme())}} className={HeaderStyle["icon"]}/>:<DarkTheme onClick={()=>{dispatch(toggleTheme())}} className={HeaderStyle["icon"]}/>}
                    
                    <div ref={notificationRef} className={HeaderStyle["notification-modal-wrapper"]}>
                        {
                            ((Boolean)(user?.unreadNotificationCount))
                            &&
                            <div className={HeaderStyle["unread-indicator"]}></div>
                        }
                        <NotificationIcon className={HeaderStyle["icon"]} onClick={()=>{setIsNotificationOpen(!isNotificationOpen)}}/>
                        {
                            isNotificationOpen && (
                                <div className={HeaderStyle["notification-modal"]}>
                                    <NotificationModal notifications={notifications} setNotifications={setNotifications}/>
                                </div>
                            )
                        }
                    </div>
                    
                    <div ref={profileRef} className={HeaderStyle["profile-wrapper"]}>
                        <UserProfile small={true} src={user?.profile} className={HeaderStyle["user-profile"]} onClick={()=>{setIsProfileOpen((isOpen)=>!isOpen)}}/>
                        {
                            isProfileOpen && (
                            <div className={HeaderStyle["user-action"]}>
                                <ul>
                                    <li onClick={()=>{safeNavigate(homeRoutes.profile+`/${user?.userName}`)}}>Profile</li>
                                    <li onClick={()=>{safeNavigate(homeRoutes.bookmarks)}}>Bookmarks</li>
                                    <li onClick={()=>{safeNavigate(homeRoutes.settings)}}>Settings</li>
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