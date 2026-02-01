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

    return (
        <>
        <div className={HomeStyle["container"]}>
            <div className={HomeStyle["header"]}>
                <Header/>
            </div>
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
        </div>
        <p>You are logged in!</p>
        <p>{backendMessage}</p>
        </>
    );
}