import AboutUserStyle from "./AboutUser.module.css";

import InstagramIcon from "../../../../assets/icons/profile/instagram.svg?react";
import FacebookIcon from "../../../../assets/icons/profile/facebook.svg?react";
import LinkedinIcon from "../../../../assets/icons/profile/linkedin.svg?react";
import YoutubeIcon from "../../../../assets/icons/profile/youtube.svg?react";


export const AboutUser = ()=>{
    return (
        <div className={AboutUserStyle["container"]}>
            <div className={AboutUserStyle["description"]}>
                <div className={AboutUserStyle["label"]}>
                    Description
                </div>
                Description That the user want the other user to know
            </div>
            <div className={AboutUserStyle["social-links"]}>
                <div className={AboutUserStyle["label"]}>
                    Social Links
                </div>
                <InstagramIcon className={AboutUserStyle["icon"]} />
                <FacebookIcon className={AboutUserStyle["icon"]} />
                <LinkedinIcon className={AboutUserStyle["icon"]} />
                <YoutubeIcon className={AboutUserStyle["icon"]} />
            </div>
        </div>
    );
}