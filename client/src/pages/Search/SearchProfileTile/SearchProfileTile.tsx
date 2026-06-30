import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import SearchProfileTileStyle from "./SearchProfileTile.module.css";

import EducationIcon from "../../../assets/icons/general/education.svg?react";
import ReputationIcon from "../../../assets/icons/general/reputation.svg?react";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
interface SearchProfileTileProps{
    profile:any;
}
export const SearchProfileTile:React.FC<SearchProfileTileProps> = ({profile})=>{
    const {safeNavigate} = useSafeNavigate();
    return (
        <div className={SearchProfileTileStyle["container"]} onClick={()=>safeNavigate(homeRoutes.profile+`/${profile.userName}`)}>
            <UserProfile src={profile.profile} className={SearchProfileTileStyle["user-profile"]}/>
            <div className={SearchProfileTileStyle["user-data"]}>
                <div className={SearchProfileTileStyle["user-name"]}>
                    {profile.firstName} {profile.lastName}
                </div>
                {
                    profile.college
                    &&
                    <div className={SearchProfileTileStyle["user-education"]}>
                        <EducationIcon className={SearchProfileTileStyle["icon"]}/>
                        <div className={SearchProfileTileStyle["user-education-name"]}>
                            {profile.college}
                        </div>
                    </div>
                }
            </div>
            <div className={SearchProfileTileStyle["user-reputation"]}>
                <ReputationIcon className={SearchProfileTileStyle["icon"]}/>
                <div className={SearchProfileTileStyle["user-reputation-score"]}>
                    {profile.reputationScore}
                </div>
            </div>
        </div>
    );
}