import MainLayoutStyle from "./MainLayout.module.css";

// import QuestionIcon from "../../../assets/icons/general/question.svg?react";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = ()=>{
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