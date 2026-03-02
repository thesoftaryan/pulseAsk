import {useLocation, useNavigate} from "react-router-dom";

export const useSafeNavigate = ()=>{

    const navigate = useNavigate();
    const location  = useLocation();

    const safeNavigate = (path : string)=>{
        if(location.pathname !== path){
            navigate(path);
        }
    };

    const replaceNavigate = (path: string)=>{
        if(location.pathname !== path){
            navigate(path, {replace:true});
        }
    }
    return {safeNavigate, replaceNavigate};
}