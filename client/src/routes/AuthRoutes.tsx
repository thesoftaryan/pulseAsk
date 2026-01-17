// We have to tell the TSX compiler that this is just a type import not a value(e.g. React Component, Functions, etc) import
import type { RouteObject } from "react-router-dom";

// Pages Import
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import VerifyEmail from "../pages/Auth/ResendVerificationEmail/ResendVerificationEmail";

import { authRoutes } from "./routesConstants";


const AuthRoutes : RouteObject[]=[
    {path:authRoutes.login, element:<Login/>},
    {path:authRoutes.register, element:<Register/>},

    {path:authRoutes.forgotPassword, element:<ForgotPassword/>},
    {path:authRoutes.resetPassword, element:<ResetPassword/>},

    {path:authRoutes.verifyEmail, element:<VerifyEmail/>},
];

export default AuthRoutes;