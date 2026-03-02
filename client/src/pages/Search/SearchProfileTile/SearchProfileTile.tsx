import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import SearchProfileTileStyle from "./SearchProfileTile.module.css";

import EducationIcon from "../../../assets/icons/general/education.svg?react";
import ReputationIcon from "../../../assets/icons/general/reputation.svg?react";

export const SearchProfileTile = ()=>{
    return (
        <div className={SearchProfileTileStyle["container"]}>
            <div className={SearchProfileTileStyle["user-profile"]}>
                <UserProfile/>
            </div>
            <div className={SearchProfileTileStyle["user-data"]}>
                <div className={SearchProfileTileStyle["user-name"]}>
                    Aryan Maurya
                </div>
                <div className={SearchProfileTileStyle["user-education"]}>
                    <EducationIcon className={SearchProfileTileStyle["icon"]}/>
                    <div className={SearchProfileTileStyle["user-education-name"]}>
                        Indian Institute of Technology, Bhilai
                    </div>
                </div>
            </div>
            <div className={SearchProfileTileStyle["user-reputation"]}>
                <ReputationIcon className={SearchProfileTileStyle["icon"]}/>
                <div className={SearchProfileTileStyle["user-reputation-score"]}>
                    93K
                </div>
            </div>
        </div>
    );
}