import AboutUserStyle from "./AboutUser.module.css";

import InstagramIcon from "../../../../assets/icons/profile/instagram.svg?react";
import FacebookIcon from "../../../../assets/icons/profile/facebook.svg?react";
import LinkedinIcon from "../../../../assets/icons/profile/linkedin.svg?react";
import YoutubeIcon from "../../../../assets/icons/profile/youtube.svg?react";


export const AboutUser = ()=>{
    return (
        <div className="container">
            <div className="description">
                Description That the user want the other user to know
            </div>
            <div className="education">
                Details showing that the user is a credible source of information and he has some knowledge

            </div>
            <div className="social-links">
                <InstagramIcon/>
                <FacebookIcon/>
                <LinkedinIcon/>
                <YoutubeIcon/>
            </div>
        </div>
    );
}