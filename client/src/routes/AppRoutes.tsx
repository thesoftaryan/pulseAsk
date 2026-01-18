import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { authRoutes } from "./routesConstants";
import { Home } from "../pages/Home/Home";


const router = createBrowserRouter([
    {path:"/", element:<Navigate to={authRoutes.login} replace/>},

    ...AuthRoutes,

    {path:"/home", element: <Home/>},

    {path:"*", element:<Navigate to={authRoutes.login} replace/>}
]);


export default router;