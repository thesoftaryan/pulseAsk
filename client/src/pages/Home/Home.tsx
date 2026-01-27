import { useEffect, useState } from "react";
import { useHomeHandler } from "./Home.handler";
import { logoutThunk } from "../../store/auth/thunks/logout.thunk";
import { useAppDispatch } from "../../hooks/store.hooks";
import { useNavigate } from "react-router-dom";
import { authRoutes } from "../../routes/routesConstants";

export const Home = ()=>{
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {homeHandler} = useHomeHandler();
    const [backendMessage, setBackendMessage] = useState("");

    useEffect(()=>{
        homeHandler(setBackendMessage);
    }, []);

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
        <p>You are logged in!</p>
        <button onClick={handleLogOut}>logout</button>
        <p>{backendMessage}</p>
        </>
    );
}