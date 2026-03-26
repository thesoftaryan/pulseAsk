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
import { HighlightTile } from "./HighlightTile/HighlightTile";
import { UserActivity } from "./UserActivity/UserActivity";



export const Profile = ()=>{
    const user = useAppSelector(state=>state.auth.user);
    console.log(user);
    return (
        <div className={ProfileStyle["container"]}>
            <div className={ProfileStyle["top-profile"]}>
                <div className={ProfileStyle["left"]}>
                    <ReportUserIcon className={`${ProfileStyle["icon"]} ${ProfileStyle["report-user"]}`}/>
                    <div className={ProfileStyle["user-profile"]}>
                        <UserProfile/>
                    </div>
                    <div className={ProfileStyle["user-name"]}>
                        {user?.firstName}  {user?.lastName}
                    </div>
                    {
                        user?.college 
                        && 
                        <div className={ProfileStyle["user-education"]}>
                            <EducationIcon className={ProfileStyle["icon"]}/>
                            <p className={ProfileStyle["user-education-text"]}>{user.college}</p>
                        </div>
                    }

                    <div className={ProfileStyle["user-actions"]}>
                        {user?.enableChat && <ChatIcon className={ProfileStyle["icon"]}/>}
                        {user?.enablePayment && <DonateIcon className={`${ProfileStyle["icon"]} ${ProfileStyle["donate-icon"]}`}/>}
                    </div>
                </div>
                <div className={ProfileStyle["right"]}>
                    <div className={ProfileStyle["user-highlights"]}>
                        <div className={ProfileStyle["title"]}>Highlights</div>
                        <div className={ProfileStyle["user-stats"]}>
                            <HighlightTile Icon={QuestionsAskedIcon} title="Questions Asked" value={(user?.questionsAsked??0).toString()}/>
                            <HighlightTile Icon={AnswersGivenIcon} title="Answers Given" value={(user?.answersGiven??0).toString()}/>
                            <HighlightTile Icon={UpvoteCountIcon} title="Upvotes" value={(user?.upvotes??0).toString()}/>
                            <HighlightTile Icon={DownvoteCountIcon} title="Downvotes" value={(user?.downvotes??0).toString()}/>
                        </div>
                        <div className={ProfileStyle["user-reputation"]}>
                            <HighlightTile danger={(user?.reputationScore??0)<0} Icon={ReputationIcon} title="Reputation Score" value={(user?.reputationScore??0).toString()}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={ProfileStyle["activity-container"]}>
                <UserActivity/>
            </div>
        </div>
    );
}