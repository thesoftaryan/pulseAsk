import PersonTileStyle from "./PersonTile.module.css";

import PersonImage from "../../../assets/images/user.png";

interface PersonTileProps{
    active?: boolean;
}

export const PersonTile:React.FC<PersonTileProps> = ({active})=>{
    return (
        <div className={`${PersonTileStyle["container"]} ${PersonTileStyle[active? "active":""]}`}>
            
            <div className={PersonTileStyle["person-profile-container"]}>
                <img src={PersonImage} className={PersonTileStyle["person-profile"]}/>
            </div>
            
            <div className={PersonTileStyle["person-data"]}>
                <div className={PersonTileStyle["person-name"]}>
                    Aryan Maurya
                </div>
                <div className={PersonTileStyle["person-last-message"]}>
                    I want to have a meet for feature discussion today evening 6'O clock
                </div>
            </div>
            <div className={PersonTileStyle["unread-count"]}>
                21
            </div>
        </div>
    );
}