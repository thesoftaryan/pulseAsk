import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { homeRoutes } from "./routesConstants";
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
import { Bookmarks } from "../pages/Bookmarks/Bookmarks";
import { Wallet } from "../pages/Wallet/Wallet";


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
                {path: homeRoutes.tag+"/:tagSlug", element: <Tag/>},
                {path: homeRoutes.question+"/:qid/:slug", element: <ShowQuestion/>},
                {path: homeRoutes.askQuestion, element: <AskQuestion/>},
                {path: homeRoutes.profile+"/:userName", element: <Profile/>},
                {path: homeRoutes.bookmarks, element: <Bookmarks/>},
                {path: homeRoutes.wallet, element: <Wallet/>},
                {path: homeRoutes.chat, element: <Chat/>},
                {path: homeRoutes.search, element: <Search/>},
                {path: homeRoutes.settings, element: <Settings/>},
              ]  
            },

            {path:"*", element:<Navigate to={homeRoutes.home} replace/>}
        ],
    },
]);


export default router;