import { useEffect, useState } from "react";
import { useHomeHandler } from "./Home.handler";
import { logoutThunk } from "../../store/auth/thunks/logout.thunk";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hooks";
import { useNavigate } from "react-router-dom";
import { authRoutes } from "../../routes/routesConstants";
import { Header } from "../../components/layout/Header/Header";
import Button from "../../components/common/Button/Button";

import ExploreIcon from "../../assets/icons/home/explore.svg?react";
import QuestionIcon from "../../assets/icons/home/question.svg?react";
import { QuickAsk } from "./QuickAsk/QuickAsk";

import HomeStyles from "./Home.module.css";

export const Home = ()=>{
    const dispatch = useAppDispatch();

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

    const handleLogOut = async ()=>{
        try{
            dispatch(logoutThunk()).unwrap();
            navigate(authRoutes.login, {replace:true});
        }catch(error){
            console.log("logout : ", error);
        }
    }

    return (
        <>
        <div className={HomeStyles["container"]}>
            <div className={HomeStyles["header"]}>
                <Header/>
            </div>
            <div className={HomeStyles["ask-question-section"]}>
                <div className={HomeStyles["quick-ask-section"]}>
                    <QuickAsk/>
                </div>
                <div className={HomeStyles["explore-and-ask"]}>
                    <Button isSmall={true} level1={true} Icon={ExploreIcon} text="Explore" onClick={handleLogOut}/>
                    <Button isSmall={true} level1={false} Icon={QuestionIcon} text="Ask question" onClick={handleLogOut}/>
                </div>
            </div>
        </div>
        <p>You are logged in!</p>
        <p>{backendMessage}</p>
        </>
    );
}