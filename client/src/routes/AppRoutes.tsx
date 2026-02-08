import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { authRoutes, homeRoutes } from "./routesConstants";
import { Home } from "../pages/Home/Home";
import App from "../App";
import { MainLayout } from "../components/layout/MainLayout/MainLayout";
import { Tag } from "../pages/Tag/Tag";
import { ShowQuestion } from "../pages/Question/ShowQuestion/ShowQuestion";


const router = createBrowserRouter([
    {
        element : <App/>,
        children : [
            {path:"/", element:<Navigate to={homeRoutes.home} replace/>},

            ...AuthRoutes,

            {
              element: <MainLayout/>,
              children:[
                {path: homeRoutes.home, element: <Home/>},
                {path: homeRoutes.tag, element: <Tag/>},
                {path: "/question", element: <ShowQuestion/>}
              ]  
            },

            {path:"*", element:<Navigate to={authRoutes.login} replace/>}
        ],
    },
]);


export default router;