import "./theme/index.css";

import { Outlet } from "react-router-dom";

import {Toaster} from "react-hot-toast";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/store.hook";
import { logoutThunk } from "./store/auth/thunks/logout.thunk";
import { authRoutes } from "./routes/routesConstants";
import { checkAuthThunk } from "./store/auth/thunks/checkAuth.thunk";
import { useApplyTheme } from "./hooks/useApplyTheme.hook";
import { useSafeNavigate } from "./hooks/useSafeNavigate.hook";
// import { toggleTheme } from "./store/theme/theme.slice";

const App = ()=>{
  // Setting up initial theme
  useApplyTheme();
 
  const dispatch = useAppDispatch();

  // const state = useAppSelector(state => state.auth);
  const {replaceNavigate} = useSafeNavigate();

  useEffect(()=>{
    const isActive = localStorage.getItem("session_active");
    if(isActive){
      dispatch(checkAuthThunk());
    }
  }, []);
  
  useEffect(()=>{
    const handler = ()=>{
      dispatch(logoutThunk());
      // console.log("handling the throwback");
      replaceNavigate(authRoutes.login);
    };
    document.addEventListener("auth/logout", handler);
    return ()=>{
      document.removeEventListener("auth/logout", handler);
    }
  }, [dispatch]);
  
  // if(state.status==="loading") return "Loading...";

  return (
    <>
    <Outlet/>
    <Toaster/>
    </>
  );
}

export default App
