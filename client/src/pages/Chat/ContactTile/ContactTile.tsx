import ContactTileStyle from "./ContactTile.module.css";

import defaultImage from "../../../assets/images/user.png";

interface ContactInterface{
    conversationId?: string;
    person:{
        firstName: string;
        lastName: string;
        profile: string;
    };
    lastMessage?:{
        sentAt: Date;
        content: string;
        sender: string;
    }
}

interface ContactTileProps{
    contact: Partial<ContactInterface>,
    onClick?: ()=>void,
    active?: boolean;
}

export const ContactTile:React.FC<ContactTileProps> = ({contact, onClick, active})=>{
    if(!contact) return "";
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
                    {contact.lastMessage?.content}
                </div>
            </div>
            <div className={ContactTileStyle["unread-count"]}>
                21
            </div>
        </div>
    );
}