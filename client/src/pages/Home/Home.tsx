import { logoutUserAPI } from "../../api/auth.api";

export const Home = ()=>{
    
    const handleLogOut = async ()=>{
        try{
            await logoutUserAPI();
            window.location.href = "http://localhost:5173/auth/login";
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