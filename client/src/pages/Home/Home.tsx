import { useEffect } from "react";
// import { useHomeHandler } from "./Home.handler";
import { useAppSelector } from "../../hooks/store.hook";
import { authRoutes, homeRoutes } from "../../routes/routesConstants";
import Button from "../../components/common/Button/Button";

// import ExploreIcon from "../../assets/icons/home/explore.svg?react";
import QuestionIcon from "../../assets/icons/home/question.svg?react";
import LoadMoreIcon from "../../assets/icons/general/load_more.svg?react";
import { QuickAsk } from "./QuickAsk/QuickAsk";

import HomeStyle from "./Home.module.css";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import { Question } from "../../components/common/Question/Question";
import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import { Answer } from "../../components/common/Answer/Answer";
import { Leaderboard } from "./Leaderboard/Leaderboard";
import { useSafeNavigate } from "../../hooks/useSafeNavigate.hook";

export const Home = ()=>{

    // const navigate = useNavigate();

    const {safeNavigate, replaceNavigate} = useSafeNavigate();
    const state = useAppSelector(state => state.auth);

    // const {homeHandler} = useHomeHandler();
    // const [backendMessage, setBackendMessage] = useState("");

    // useEffect(()=>{
    //     homeHandler(setBackendMessage);
    // }, []);


    useEffect(()=>{
        if(!state.isAuthenticated){
            replaceNavigate(authRoutes.login);
        }
    }, [state.isAuthenticated]);

    const answerObj : Partial<AnswerInterface> = {
        author : {_id: "2", email: "thesoftaryan@gmail.com", firstName:"Aryan", lastName:"Maurya"},
        content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
    }


    return (
        <>
        <div className={HomeStyle["container"]}>
            {/* <div className="mainContent"></div> */}
            <div className={HomeStyle["ask-question-section"]}>
                <div className={HomeStyle["quick-ask-section"]}>
                    <QuickAsk/>
                </div>
                <div className={HomeStyle["explore-and-ask"]}>
                    {/* <Button isSmall={true} level1={true} Icon={ExploreIcon} text="Explore" onClick={()=>{}}/> */}
                    <Button isSmall={true} level1={false} Icon={QuestionIcon} text="Ask question" onClick={()=>{safeNavigate(homeRoutes.askQuestion)}}/>
                </div>
            </div>

            <div className={HomeStyle["main-section"]}>
                <div className={HomeStyle["filters-section"]}>
                    <FilterBar/>
                </div>
                <div className={HomeStyle["question-leaderboard-section"]}>
                    <div className={HomeStyle["question-section"]}>
                        <Question onClick={()=>{safeNavigate(homeRoutes.question)}} id="" title="How to do CPR correctly, Urgent help needed!" author={{_id: "1", email: "", firstName:"", lastName:""}}/>
                        {/* <Question onClick={()=>{safeNavigate(homeRoutes.question)}} best_answer={<Answer level1Comments={true} author={answerObj.author!} content={answerObj.content!}/>} id="" title="How to do CPR correctly, Urgent help needed!" author={{_id: "1", email: "", firstName:"", lastName:""}}/> */}

                        <div className={HomeStyle["load-more-button"]}>
                            <Button text="Load More" isSmall={true} level1={true} Icon={LoadMoreIcon}/>
                        </div>
                    </div>
                    <div className={HomeStyle["leaderboard-section"]}>
                        <Leaderboard/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}