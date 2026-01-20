import { useNavigate } from "react-router-dom";
import { logoutUserAPI } from "../../api/auth.api";
import { authRoutes } from "../../routes/routesConstants";

export const Home = ()=>{
    const navigate = useNavigate();
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
        </>
    );
}