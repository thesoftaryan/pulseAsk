import {useLocation, useNavigate} from "react-router-dom";

export const useSafeNavigate = ()=>{

    const navigate = useNavigate();
    const location  = useLocation();

    const backNavigate = ()=>{
        navigate(-1);
    }

    const safeNavigate = (path : string, refresh:boolean=false)=>{
        if(location.pathname !== path){
            navigate(path);
        }else{
          if(refresh) navigate(0);  
        }
    };

    const replaceNavigate = (path: string)=>{
        if(location.pathname !== path){
            navigate(path, {replace:true});
        }
    }
    return {safeNavigate, replaceNavigate, backNavigate};
}