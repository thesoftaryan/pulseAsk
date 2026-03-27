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
                {user.description??(<p className={AboutUserStyle["label"]}>No Description available</p>)}
            </div>
            <div className={AboutUserStyle["social-links"]}>
                <div className={AboutUserStyle["label"]}>
                    Social Links
                </div>
                {user.instagram && <InstagramIcon className={AboutUserStyle["icon"]}/>}
                {user.facebook && <FacebookIcon className={AboutUserStyle["icon"]} />}
                {user.linkedin && <LinkedinIcon className={AboutUserStyle["icon"]} />}
                {user.youtube && <YoutubeIcon className={AboutUserStyle["icon"]} />}
            </div>
        </div>
    );
}