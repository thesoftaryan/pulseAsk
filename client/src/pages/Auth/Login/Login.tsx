// React Router
import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

// Routes
import { authRoutes, homeRoutes } from "../../../routes/routesConstants";

// Logical Parts
import { loginFormValidator } from "./Login.validator";
// Types
import type { LoginFormData } from "../../../types/ApiRequest/auth.type";

// Components
import InputField from "../../../components/common/InputField/InputField";
import CheckBox from "../../../components/common/CheckBox/CheckBox";
import Button from "../../../components/common/Button/Button";
import Divider from "../../../components/common/Divider/Divider";
import SocialSignInCard from "../../../components/common/SocialSignInCard/SocialSignInCard";
import GapBox from "../../../components/common/GapBox/GapBox";
import InlineError from "../../../components/common/InlineError/InlineError";

// SVG Icons
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";
import GoogleSocialSignInIcon from "../../../assets/icons/google.svg?react";
// import FacebookSocialSignInIcon from "../../../assets/icons/facebook.svg?react";


// Images
import BannerImageLight from "../../../assets/images/Authentication/banner-light.png";
import BannerImageDark from "../../../assets/images/Authentication/banner-dark.png";

// Style
import LoginStyle from "./Login.module.css";
import { useLoginHandler } from "./Login.handler";
import { useAppSelector } from "../../../hooks/store.hook";

function Login() {
    
    const navigate = useNavigate();

    // {**************** Logical Part : start ******************}

    const state = useAppSelector(state => state.auth);
    const theme = useAppSelector(state=>state.theme.theme);

    useEffect(()=>{
        if(state.isAuthenticated){
            navigate(homeRoutes.home, {replace:true});
        }
    }, [state.isAuthenticated]);


    const {loginHandler, socialLoginHandler} = useLoginHandler();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<Partial<LoginFormData>>({});

    const handleLogin = ()=>{
        const data : LoginFormData = {email, password, rememberMe : rememberMe};
        const validation = loginFormValidator(data);
        setError(validation);

        if(Object.keys(validation).length === 0){
            loginHandler(data);
        }

    }

    // {**************** Logical Part : End   ******************}



    return <>
        <div className={LoginStyle["container"]}>
            <div className={LoginStyle["left-container"]}>
                <div className={LoginStyle["image-wrapper"]}>
                    <img src={(theme==="dark")?BannerImageDark:BannerImageLight} alt="Banner-Image" className={LoginStyle["banner-image"]}/>
                </div>
                <div className={LoginStyle["left-container-header"]}>
                    <div className={LoginStyle["main-icon"]}>
                        <PulseAskIcon/>
                    </div>
                </div>
            </div>

            <div className={LoginStyle["right-container"]}>
                <div className={LoginStyle["header"]}>
                    <h1 className={LoginStyle["heading"]}> Login to Account</h1>
                    <p className={LoginStyle["signup"]}>Don't have an account? <Link replace={true} to={authRoutes.register}>SignUp</Link></p>
                </div>



                <form className={LoginStyle["login-form"]} >
                    <InputField name="email" placeholder="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value);setError({});}} isError={error.email?.length}/>
                    {(error.email?.length) && <InlineError message={error.email}/>}
                    <InputField name="password" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value);setError({});}} isError={error.password?.length}/>
                    {(error.password?.length) && <InlineError message={error.password}/>}
                    <CheckBox text={"Remember me"} onChange={(e)=>{setRememberMe(e.target.checked)}}/>

                    {/* Gaps are already defined in index.css inside theme directory */}
                    <GapBox className={"gap-y-medium"} />

                    <Button text="Login" onClick={handleLogin} loading={state.status==="loading"}/>

                    <GapBox className={"gap-y-md"} />
                    <Link className={LoginStyle["forgot-password"]} to="/auth/forgot-password" >Forgot password?</Link>

                    <Divider text="Or login with"></Divider>
                    <SocialSignInCard text="Google" Icon={GoogleSocialSignInIcon} onClick={()=>{socialLoginHandler("google");}} />
                    {/* <SocialSignInCard text="Facebook" Icon={FacebookSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} /> */}
                </form>
            </div>
        </div>
    </>;
}

export default Login;