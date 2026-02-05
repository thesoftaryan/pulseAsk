import { useEffect, useState } from "react";
import { useHomeHandler } from "./Home.handler";
import { useAppSelector } from "../../hooks/store.hooks";
import { useNavigate } from "react-router-dom";
import { authRoutes } from "../../routes/routesConstants";
import { Header } from "../../components/layout/Header/Header";
import Button from "../../components/common/Button/Button";

import ExploreIcon from "../../assets/icons/home/explore.svg?react";
import QuestionIcon from "../../assets/icons/home/question.svg?react";
import { QuickAsk } from "./QuickAsk/QuickAsk";

import HomeStyle from "./Home.module.css";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import { Question } from "../../components/common/Question/Question";
import type { AnswerInterface } from "../../types/answer.types";
import { Answer } from "../../components/common/Answer/Answer";
import { Leaderboard } from "./Leaderboard/Leaderboard";

export const Home = ()=>{

    const navigate = useNavigate();

    const state = useAppSelector(state => state.auth);

    const {homeHandler} = useHomeHandler();
    const [backendMessage, setBackendMessage] = useState("");

    useEffect(()=>{
        homeHandler(setBackendMessage);
    }, []);


    useEffect(()=>{
        if(!state.isAuthenticated){
            navigate(authRoutes.login, {replace:true});
        }
    }, [state.isAuthenticated]);

    const answerObj : AnswerInterface = {
        author : {uid: "2", email: "thesoftaryan@gmail.com", first_name:"Aryan", last_name:"Maurya"},
        content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
    }


    return (
        <>
        <div className={HomeStyle["container"]}>
            <div className={HomeStyle["header"]}>
                <Header/>
            </div>
            {/* <div className="mainContent"></div> */}
            <div className={HomeStyle["ask-question-section"]}>
                <div className={HomeStyle["quick-ask-section"]}>
                    <QuickAsk/>
                </div>
                <div className={HomeStyle["explore-and-ask"]}>
                    <Button isSmall={true} level1={true} Icon={ExploreIcon} text="Explore" onClick={()=>{}}/>
                    <Button isSmall={true} level1={false} Icon={QuestionIcon} text="Ask question" onClick={()=>{}}/>
                </div>
            </div>
            <div className={HomeStyle["filters-section"]}>
                <FilterBar/>
            </div>
            <div className={HomeStyle["question-leaderboard-section"]}>
                <div className={HomeStyle["question-section"]}>
                    <Question id="" title="How to do CPR correctly, Urgent help needed!" author={{uid: "1", email: "", first_name:"", last_name:""}}/>
                    <Question best_answer={<Answer author={answerObj.author} content={answerObj.content}/>} id="" title="How to do CPR correctly, Urgent help needed!" author={{uid: "1", email: "", first_name:"", last_name:""}}/>
                </div>
                <div className={HomeStyle["leaderboard-section"]}>
                    <Leaderboard/>
                </div>
            </div>
        </div>
        <p>You are logged in!</p>
        <p>{backendMessage}</p>
        </>
    );
}