import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { authRoutes, homeRoutes } from "./routesConstants";
import { Home } from "../pages/Home/Home";
import App from "../App";


const router = createBrowserRouter([
    {
        element : <App/>,
        children : [
            {path:"/", element:<Navigate to={homeRoutes.home} replace/>},

            ...AuthRoutes,

            {path:"/home", element: <Home/>},

            {path:"*", element:<Navigate to={authRoutes.login} replace/>}
        ],
    },
]);


export default router;