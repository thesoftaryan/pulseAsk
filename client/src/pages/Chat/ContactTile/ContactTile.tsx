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
    let lastMessagePreview = "";
    
    if(contact.lastMessage){
        if(contact.lastMessage.type==="image"){
            if((contact.lastMessage?.caption?.length??0) > 30){
                lastMessagePreview = contact.lastMessage?.caption?.slice(0, 30)+"...";
            }else{
                lastMessagePreview = "📷 photo"
            }
        }
        else{
            if((contact.lastMessage?.content.length??0) > 30){
                lastMessagePreview = contact.lastMessage?.content.slice(0, 30)+"...";
            }else{
                lastMessagePreview = contact.lastMessage.content;
            }
        }
    }

    return (
        <div onClick={onClick} className={`${ContactTileStyle["container"]} ${ContactTileStyle[active? "active":""]}`}>
            <div className={ContactTileStyle["person-profile-container"]}>
                <img src={contact.person?.profile??defaultImage} className={`${ContactTileStyle["person-profile"]} ${contact.person.status==="online"? ContactTileStyle["person-online"]:""}`}/>
            </div>
            
            <div className={ContactTileStyle["person-data"]}>
                <div className={ContactTileStyle["person-name"]}>
                    {contact.person?.firstName} {contact.person?.lastName}
                </div>
                <div className={ContactTileStyle["person-last-message"]}>
                    {
                        lastMessagePreview
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