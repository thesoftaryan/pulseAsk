import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { authRoutes, homeRoutes } from "./routesConstants";
import { Home } from "../pages/Home/Home";
import App from "../App";
import { MainLayout } from "../components/layout/MainLayout/MainLayout";
import { Tag } from "../pages/Tag/Tag";
import { ShowQuestion } from "../pages/Question/ShowQuestion/ShowQuestion";
import { AskQuestion } from "../pages/Question/AskQuestion/AskQuestion";
import { Profile } from "../pages/Profile/Profile";
import { Chat } from "../pages/Chat/Chat";
import { Search } from "../pages/Search/Search";
import { Settings } from "../pages/Settings/Settings";


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
                {path: homeRoutes.question, element: <ShowQuestion/>},
                {path: homeRoutes.askQuestion, element: <AskQuestion/>},
                {path: homeRoutes.profile, element: <Profile/>},
                {path: homeRoutes.chat, element: <Chat/>},
                {path: homeRoutes.search, element: <Search/>},
                {path: homeRoutes.settings, element: <Settings/>},
              ]  
            },

            {path:"*", element:<Navigate to={authRoutes.login} replace/>}
        ],
    },
]);


export default router;