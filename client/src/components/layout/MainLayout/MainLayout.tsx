import MainLayoutStyle from "./MainLayout.module.css";

// import QuestionIcon from "../../../assets/icons/general/question.svg?react";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import { useAppSelector } from "../../../hooks/store.hook";
// import { authRoutes } from "../../../routes/routesConstants";
// import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";

export const MainLayout = ()=>{

    // const state = useAppSelector(state => state.auth);
    // const {replaceNavigate} = useSafeNavigate();

    // useEffect(()=>{
    //     if(!state.isAuthenticated){
    //         console.log("user not set");
    //         replaceNavigate(authRoutes.login);
    //     }
    // }, [state.status, state.isAuthenticated]);

    // if(state.status==="loading") return "Loading...";
    
    return (
        <div className={MainLayoutStyle["container"]}>
            <Header/>

            <div className={MainLayoutStyle["main-component"]}>
                <Outlet/>
            </div>

            {/* <div className={MainLayoutStyle["ask-question"]}>
                <QuestionIcon className={MainLayoutStyle["icon"]}/>
            </div> */}

            <Footer/>

        </div>
    );
}