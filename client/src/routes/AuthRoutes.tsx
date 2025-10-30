// We have to tell the TSX compiler that this is just a type import not a value(e.g. React Component, Functions, etc) import
import type { RouteObject } from "react-router-dom";

// Pages Import
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ForgotPassword/ResetPassword";
import VerifyEmail from "../pages/Auth/VerifyEmail/VerifyEmail";



const AuthRoutes : RouteObject[]=[
    {path:"/auth/login", element:<Login/>},
    {path:"/auth/register", element:<Register/>},

    {path:"/auth/forgot-password", element:<ForgotPassword/>},
    {path:"/auth/reset-password", element:<ResetPassword/>},

    {path:"/auth/verify-email", element:<VerifyEmail/>},
];

export default AuthRoutes;