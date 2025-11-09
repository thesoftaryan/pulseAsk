// React Router
import {Link} from "react-router-dom";
import { useState } from "react";

// Logical Parts
import { loginFormValidator, type LoginFormData } from "./login.validator";

// Components
import InputField from "../../../components/common/InputField/InputField";
import CheckBox from "../../../components/common/CheckBox/CheckBox";
import Button from "../../../components/common/Button/Button";
import Divider from "../../../components/common/Divider/Divider";
import SocialSignInCard from "../../../components/common/SocialSignInCard/SocialSignInCard";
import GapBox from "../../../components/common/GapBox/GapBox";
import ErrorText from "../../../components/common/ErrorText/ErrorText";

// SVG Icons
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";
import LeftChevronIcon from "../../../assets/icons/Chevron left.svg?react";
import GoogleSocialSignInIcon from "../../../assets/icons/google.svg?react";
import FacebookSocialSignInIcon from "../../../assets/icons/facebook.svg?react";


// Images
import BannerImageLight from "../../../assets/images/Authentication/banner-light.png";
// import BannerImageDark from "../../../assets/images/Authentication/banner-dark.png";

// Style
import LoginStyle from "./Login.module.css";


function Login() {
    

    // {**************** Validation of input : start ******************}


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<Partial<LoginFormData>>({});

    const handleLogin = ()=>{
        const validation = loginFormValidator({email, password});
        setError(validation);

        if(Object.keys(validation).length === 0){
            // Trigger the Login Handler function from here
            // console.log("fine for initiating login");
        }

    }



    // {**************** Validation of input : End   ******************}



    return <>
        <div className={LoginStyle["container"]}>
            <div className={LoginStyle["left-container"]}>
                <div className={LoginStyle["image-wrapper"]}>
                    <img src={BannerImageLight} alt="Banner-Image" className={LoginStyle["banner-image"]}/>
                </div>
                <div className={LoginStyle["left-container-header"]}>
                    <div className={LoginStyle["main-icon"]}>
                        <PulseAskIcon/>
                    </div>
                    <button className={LoginStyle["back-button"]}>
                        <div className={LoginStyle["chevron-left"]}>
                            <LeftChevronIcon/>
                        </div>
                        <div className={LoginStyle["back-button-text"]}>
                            Back to Homepage
                        </div>
                    </button>
                </div>
            </div>

            <div className={LoginStyle["right-container"]}>
                <div className={LoginStyle["header"]}>
                    <h1 className={LoginStyle["heading"]}> Login to Account</h1>
                    <p className={LoginStyle["signup"]}>Don't have an account? <Link to="/auth/register">SignUp</Link></p>
                </div>



                <div className={LoginStyle["login-form"]} >
                    <InputField name="email" placeholder="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value);}} isError={error.email?.length}/>
                    {(error.email?.length) && <ErrorText message={error.email}/>}
                    <InputField name="password" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value);}} isError={error.password?.length}/>
                    {(error.password?.length) && <ErrorText message={error.password}/>}
                    <CheckBox text={"Remember me"}></CheckBox>

                    {/* Gaps are already defined in index.css inside theme directory */}
                    <GapBox className={"gap-y-medium"} />

                    <Button text="Login" onClick={handleLogin}/>

                    <GapBox className={"gap-y-md"} />
                    <Link className={LoginStyle["forgot-password"]} to="/auth/forgot-password" >Forgot password?</Link>

                    <Divider text="Or login with"></Divider>
                    <SocialSignInCard text="Google" Icon={GoogleSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                    <SocialSignInCard text="Facebook" Icon={FacebookSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                </div>
            </div>
        </div>
    </>;
}

export default Login;