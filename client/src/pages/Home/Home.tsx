import { useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../../api/auth.api";
import { authRoutes } from "../../routes/routesConstants";
import { useEffect, useState } from "react";
import { useHomeHandler } from "./Home.handler";

export const Home = ()=>{
    const navigate = useNavigate();

    const {homeHandler} = useHomeHandler();
    const [backendMessage, setBackendMessage] = useState("");

    useEffect(()=>{
        homeHandler(setBackendMessage);
    }, []);

    const handleLogOut = async ()=>{
        try{
            await logoutUserAPI();
            navigate(authRoutes.login);
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