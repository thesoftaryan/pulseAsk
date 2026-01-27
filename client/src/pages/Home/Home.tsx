import { useEffect, useState } from "react";
import { useHomeHandler } from "./Home.handler";
import { logoutThunk } from "../../store/auth/thunks/logout.thunk";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hooks";
import { useNavigate } from "react-router-dom";
import { authRoutes } from "../../routes/routesConstants";
import { Header } from "../../components/layout/Header/Header";

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
        <div className="container">
            <div className="header">
                <Header/>
                Something
            </div>
        </div>
        <p>You are logged in!</p>
        <button onClick={handleLogOut}>logout</button>
        <p>{backendMessage}</p>
        </>
    );
}