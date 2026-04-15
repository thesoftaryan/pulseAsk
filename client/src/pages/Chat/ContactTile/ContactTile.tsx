import ContactTileStyle from "./ContactTile.module.css";

import defaultImage from "../../../assets/images/user.png";
import type { ContactInterface } from "../../../types/ApiResponse/chat.type";
import { useAppSelector } from "../../../hooks/store.hook";


interface ContactTileProps{
    contact: ContactInterface,
    onClick?: ()=>void,
    active?: boolean;
}

export const ContactTile:React.FC<ContactTileProps> = ({contact, onClick, active})=>{
    if(!contact) return "";
    const user = useAppSelector(state=>state.auth.user);
    // console.log(contact);
    return (
        <div onClick={onClick} className={`${ContactTileStyle["container"]} ${ContactTileStyle[active? "active":""]}`}>
            <div className={ContactTileStyle["person-profile-container"]}>
                <img src={contact.person?.profile??defaultImage} className={ContactTileStyle["person-profile"]}/>
            </div>
            
            <div className={ContactTileStyle["person-data"]}>
                <div className={ContactTileStyle["person-name"]}>
                    {contact.person?.firstName} {contact.person?.lastName}
                </div>
                <div className={ContactTileStyle["person-last-message"]}>
                    {
                        (contact.lastMessage?.content.length??0) > 30 ?
                        contact.lastMessage?.content.slice(0, 30)+"..."
                        :
                        contact.lastMessage?.content
                    }
                </div>
            </div>
            {
                ((contact.unreadCount > 0)  && (contact.lastMessage?.sender != user?._id))
                &&
                (<div className={ContactTileStyle["unread-count"]}>
                    {
                        (contact.unreadCount<=99)?
                        contact.unreadCount
                        :
                        "99+"
                    }
                </div>)
            }
        </div>
    );
}