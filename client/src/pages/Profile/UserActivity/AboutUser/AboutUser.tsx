import AboutUserStyle from "./AboutUser.module.css";

import InstagramIcon from "../../../../assets/icons/profile/instagram.svg?react";
import FacebookIcon from "../../../../assets/icons/profile/facebook.svg?react";
import LinkedinIcon from "../../../../assets/icons/profile/linkedin.svg?react";
import YoutubeIcon from "../../../../assets/icons/profile/youtube.svg?react";
import type { UserInterface } from "../../../../types/ApiResponse/user.type";

interface AboutUserProps{
    user:Partial<UserInterface>,
}

export const AboutUser:React.FC<AboutUserProps> = ({user})=>{
    return (
        <div className={AboutUserStyle["container"]}>
            <div className={AboutUserStyle["description"]}>
                <div className={AboutUserStyle["label"]}>
                    Description
                </div>
                {user.descriptionHTML??(<p className={AboutUserStyle["label"]}>No Description available</p>)}
            </div>
            <div className={AboutUserStyle["social-links"]}>
                <div className={AboutUserStyle["label"]}>
                    Social Links
                </div>
                {
                    user.instagram 
                    && 
                    <a href={`https://instagram.com/${user.instagram}`} target="_blank">
                    <InstagramIcon className={AboutUserStyle["icon"]}/>
                    </a>
                }
                {
                    user.facebook 
                    && 
                    <a href={`https://facebook.com/${user.facebook}`} target="_blank">
                    <FacebookIcon className={AboutUserStyle["icon"]} />
                    </a>
                }
                {
                    user.linkedin 
                    && 
                    <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank">
                    <LinkedinIcon className={AboutUserStyle["icon"]} />
                    </a>
                }
                {
                    user.youtube 
                    && 
                    <a href={`https://youtube.com/@${user.youtube}`} target="_blank">
                    <YoutubeIcon className={AboutUserStyle["icon"]} />
                    </a>
                }
            </div>
        </div>
    );
}