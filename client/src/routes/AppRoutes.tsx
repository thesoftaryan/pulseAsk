import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";


const router = createBrowserRouter([
    {path:"/", element:<Navigate to="/auth/login" replace/>},

    ...AuthRoutes,

    {path:"*", element:<Navigate to="/auth/login" replace/>}
]);


export default router;