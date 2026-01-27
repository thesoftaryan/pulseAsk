import "./theme/index.css";
// import Login from './pages/Auth/Login/Login';
// import Register from "./pages/Auth/Register/Register";
// import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/Auth/ForgotPassword/ResetPassword";
// import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";


import { Outlet, useNavigate } from "react-router-dom";

import {Toaster} from "react-hot-toast";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/store.hooks";
import { logoutThunk } from "./store/auth/thunks/logout.thunk";
import { authRoutes } from "./routes/routesConstants";
import { checkAuthThunk } from "./store/auth/thunks/checkAuthThunk";

const App = ()=>{
  // Testing the dark Theme
  document.documentElement.setAttribute("data-theme", "dark");
  document.documentElement.removeAttribute("data-theme");
  // return (
  //   <>
  //     {/* <Register/> */}
  //     {/* <Login/> */}
  //     {/* <ForgotPassword/> */}
  //     {/* <ResetPassword/> */}
  //     <VerifyEmail/>
  //   </>
  // );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(checkAuthThunk())
  }, []);

  useEffect(()=>{
    const handler = ()=>{
      dispatch(logoutThunk());
      navigate(authRoutes.login, {replace : true});
    };
    document.addEventListener("auth/logout", handler);
    return ()=>{
      document.removeEventListener("auth/logout", handler);
    }
  }, [dispatch]);

  return (
    <>
    <Outlet/>
    <Toaster/>
    </>
  );
}

export default App
