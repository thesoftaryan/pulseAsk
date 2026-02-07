// React Router
import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

// Routes
import { authRoutes, homeRoutes } from "../../../routes/routesConstants";

// Logical Parts
import { registerFormValidator } from "./Register.validator";

// Types
import type { RegisterFormData } from "../../../types/auth.types";

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
import RegisterStyle from "./Register.module.css";
import { useRegisterHandler } from "./Register.handler";
import { useAppSelector } from "../../../hooks/store.hook";


function Register() {

    const navigate = useNavigate();

    // {**************** Registration Logic : start ******************}

    const state = useAppSelector(state => state.auth);
    const theme = useAppSelector(state=>state.theme.theme);

    useEffect(()=>{
        if(state.isAuthenticated){
            navigate(homeRoutes.home, {replace:true});
        }
    }, [state.isAuthenticated]);

    const {registerHandler, socialRegisterHandler} = useRegisterHandler();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreement, setAgreement] = useState<boolean>(false);
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});


    const handleRegister = ()=>{
        const data : RegisterFormData = {first_name:firstName, last_name: lastName, email, password, agreement};
        const validation = registerFormValidator(data);
        setErrors(validation);

        if(Object.keys(validation).length===0){
            registerHandler(data);
        }
    }


    // {**************** Registration Logic : end ******************}





    return <>
        <div className={RegisterStyle["container"]}>
            <div className={RegisterStyle["left-container"]}>
                <div className={RegisterStyle["image-wrapper"]}>
                    <img src={(theme==="dark")?BannerImageDark:BannerImageLight} alt="Banner-Image" className={RegisterStyle["banner-image"]}/>
                </div>
                <div className={RegisterStyle["left-container-header"]}>
                    <div className={RegisterStyle["main-icon"]}>
                        <PulseAskIcon/>
                    </div>
                </div>
            </div>

            <div className={RegisterStyle["right-container"]}>
                <div className={RegisterStyle["header"]}>
                    <h1 className={RegisterStyle["heading"]}> Create an Account</h1>
                    <p className={RegisterStyle["login"]}>Already have an account? <Link replace={true} to={authRoutes.login}>Login</Link></p>
                </div>



                <form className={RegisterStyle["register-form"]}>
                    <div className={RegisterStyle["name-input-container"]}>
                        <span>
                            <InputField name="firstName" placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} isError={errors.first_name?.length}/>
                            {(errors.first_name?.length) && <InlineError message={errors.first_name}/>}
                        </span>
                        <span>
                            <InputField name="lastName" placeholder="Last Name"  onChange={(e)=>{setLastName(e.target.value)}} value={lastName} isError={errors.last_name?.length}/>
                            {(errors.last_name?.length) && <InlineError message={errors.last_name}/>}
                        </span>
                    </div>
                    <InputField placeholder="Email" type="email"  onChange={(e)=>{setEmail(e.target.value)}} value={email} isError={errors.email?.length}/>
                    {(errors.email?.length) && <InlineError message={errors.email}/>}

                    <InputField placeholder="Password" type="password"  onChange={(e)=>{setPassword(e.target.value)}} value={password} isError={errors.password?.length}/>
                    {(errors.password?.length) && <InlineError message={errors.password}/>}

                    <CheckBox text={"Agree to"} linkText="Terms & Conditions" link=""  onChange={(e)=>{setAgreement(e.target.checked)}}  checked={agreement} isError={(!agreement && ("agreement" in errors))}/>
                    {(!agreement && ("agreement" in errors)) && <InlineError message={"You must agree to continue"}/>}

                    {/* Gaps are already defined in index.css inside theme directory */}
                    <GapBox className={"gap-y-md"} />

                    <Button text="Signup" onClick={handleRegister}  disabled={state.status==="loading"}/>
                    <Divider text="Or Signup with"></Divider>
                    <SocialSignInCard text="Google" Icon={GoogleSocialSignInIcon} onClick={() => { socialRegisterHandler("google"); }} />
                    {/* <SocialSignInCard text="Facebook" Icon={FacebookSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} /> */}
                </form>
            </div>
        </div>
    </>;
}

export default Register;