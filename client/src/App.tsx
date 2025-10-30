import "./theme/index.css";
// import Login from './pages/Auth/Login/Login';
// import Register from "./pages/Auth/Register/Register";
// import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/Auth/ForgotPassword/ResetPassword";
// import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";


import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";


function App(){
  // Testing the dark Theme
  // document.documentElement.setAttribute("data-theme", "dark");
  // return (
  //   <>
  //     {/* <Register/> */}
  //     {/* <Login/> */}
  //     {/* <ForgotPassword/> */}
  //     {/* <ResetPassword/> */}
  //     <VerifyEmail/>
  //   </>
  // );
  return <RouterProvider router={router}/>;
}

export default App
