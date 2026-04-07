import { UserProfile } from "../../components/common/UserProfile/UserProfile";

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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfileHandler } from "./Profile.handler";
import type { UserInterface } from "../../types/ApiResponse/user.type";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import { useSafeNavigate } from "../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../routes/routesConstants";



export const Profile = ()=>{
    // const user = useAppSelector(state=>state.auth.user);

    // console.log(user);

    const {safeNavigate} = useSafeNavigate();

    const params = useParams();
    const userName = params.userName;


    const [fetchingProfile, setFetchingProfile] = useState(false);
    
    const [user, setUser] = useState<Partial<UserInterface>>({});
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);
    const [answers, setAnswers] = useState<AnswerInterface[]>([]);


    const {fetchProfileHandler} = useProfileHandler(setUser, setQuestions, setAnswers, setFetchingProfile);

    useEffect(()=>{
        fetchProfileHandler(userName);
    }, [userName]);

    if(fetchingProfile) return "Loading";

    return (
        <div className={ProfileStyle["container"]}>
            <div className={ProfileStyle["top-profile"]}>
                <div className={ProfileStyle["left"]}>
                    <ReportUserIcon className={`${ProfileStyle["icon"]} ${ProfileStyle["report-user"]}`}/>
                    <div className={ProfileStyle["user-profile"]}>
                        <UserProfile src={user?.profile}  className={ProfileStyle["user-profile"]}/>
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
                        {user?.chatPreferences?.enableChat && <ChatIcon className={ProfileStyle["icon"]} onClick={()=>{safeNavigate(homeRoutes.chat+`?user=${user._id}`)}}/>}
                        {user?.paymentPreferences?.enablePayment && <DonateIcon className={`${ProfileStyle["icon"]} ${ProfileStyle["donate-icon"]}`}/>}
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
                <UserActivity user={user} questions={questions} answers={answers}/>
            </div>
        </div>
    );
}