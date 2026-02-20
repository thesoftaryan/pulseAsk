import { UserProfile } from "../../components/common/UserProfile/UserProfile";
import { useAppSelector } from "../../hooks/store.hook";

import ProfileStyle from "./Profile.module.css";

import ReportUserIcon from "../../assets/icons/general/report_user.svg?react";
import EducationIcon from "../../assets/icons/general/education.svg?react";
import ChatIcon from "../../assets/icons/header/message.svg?react";
import DonateIcon from "../../assets/icons/general/donate.svg?react";
import ReputationIcon from "../../assets/icons/general/reputation.svg?react";
import QuestionsAskedIcon from "../../assets/icons/profile/questions_asked.svg?react";
import AnswersGivenIcon from "../../assets/icons/profile/answers_given.svg?react";
import UpvoteCountIcon from "../../assets/icons/profile/upvote_count.svg?react";
import DownvoteCountIcon from "../../assets/icons/profile/downvote_count.svg?react";



export const Profile = ()=>{
    let user = useAppSelector(state=>state.auth.user);
    return (
        <div className={ProfileStyle["container"]}>
            <div className={ProfileStyle["top-profile"]}>
                <div className={ProfileStyle["left"]}>
                    <ReportUserIcon className={`${ProfileStyle["report-user"]} ${ProfileStyle["icon"]}`}/>
                    <div className={ProfileStyle["user-profile"]}>
                        <UserProfile/>
                    </div>
                    <div className={ProfileStyle["user-name"]}>
                        {user?.first_name}  {user?.last_name}
                    </div>
                    <div className={ProfileStyle["user-education"]}>
                        <EducationIcon className={ProfileStyle["icon"]}/>
                        Indian Institute of Technology, Bhilai
                    </div>
                    <div className={ProfileStyle["user-contact"]}>
                        <ChatIcon className={ProfileStyle["icon"]}/>
                        <DonateIcon className={ProfileStyle["icon"]}/>
                    </div>
                </div>
                <div className={ProfileStyle["right"]}>
                    <div className={ProfileStyle["title"]}>Highlights</div>
                    <div className={ProfileStyle["user-stats"]}>
                        <QuestionsAskedIcon className={ProfileStyle["icon"]}/>
                        <AnswersGivenIcon className={ProfileStyle["icon"]}/>
                        <UpvoteCountIcon className={ProfileStyle["icon"]}/>
                        <DownvoteCountIcon className={ProfileStyle["icon"]}/>
                    </div>
                    <div className={ProfileStyle["user-reputation"]}>
                        <ReputationIcon className={ProfileStyle["icon"]}/>
                        <div className={ProfileStyle["user-reputation-content"]}>
                            <div className={ProfileStyle["user-reputation-label"]}>Reputation Score</div>
                            <div className={ProfileStyle["user-reputation-score"]}>112.6K</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ProfileStyle["activity-container"]}>

            </div>
        </div>
    );
}