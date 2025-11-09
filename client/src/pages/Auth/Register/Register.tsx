// React Router
import {Link} from "react-router-dom";
import { useState } from "react";

// Logical Parts
import { registerFormValidator, type RegisterFormData } from "./Register.validator";

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
// import BannerImageLight from "../../../assets/images/Authentication/banner-light.png";
import BannerImageDark from "../../../assets/images/Authentication/banner-dark.png";

// Style
import RegisterStyle from "./Register.module.css";


function Register() {


    // {**************** Validation of input : start ******************}

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreement, setAgreement] = useState("");
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});


    /// have to complete this part completely : Input has to be given isError atribute as well.
    const handleRegister = ()=>{
        const validation = registerFormValidator({firstName, lastName, email, password, agreement});
        setErrors(validation);

        if(Object.keys(validation).length===0){
            console.log("data is perfect to register");
        }
    }


    // {**************** Validation of input : end ******************}





    return <>
        <div className={RegisterStyle["container"]}>
            <div className={RegisterStyle["left-container"]}>
                <div className={RegisterStyle["image-wrapper"]}>
                    <img src={BannerImageDark} alt="Banner-Image" className={RegisterStyle["banner-image"]}/>
                </div>
                <div className={RegisterStyle["left-container-header"]}>
                    <div className={RegisterStyle["main-icon"]}>
                        <PulseAskIcon/>
                    </div>
                    <button className={RegisterStyle["back-button"]}>
                        <div className={RegisterStyle["chevron-left"]}>
                            <LeftChevronIcon/>
                        </div>
                        <div className={RegisterStyle["back-button-text"]}>
                            Back to Homepage
                        </div>
                    </button>
                </div>
            </div>

            <div className={RegisterStyle["right-container"]}>
                <div className={RegisterStyle["header"]}>
                    <h1 className={RegisterStyle["heading"]}> Create an Account</h1>
                    <p className={RegisterStyle["login"]}>Already have an account? <Link to="/auth/login">Login</Link></p>
                </div>



                <form className={RegisterStyle["register-form"]}>
                    <div className={RegisterStyle["name-input-container"]}>
                        <InputField name="firstName" placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName}/>
                        <InputField name="lastName" placeholder="Last Name"  onChange={(e)=>{setLastName(e.target.value)}} value={lastName}/>
                    </div>
                    <InputField placeholder="Email" type="email"  onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                    <InputField placeholder="Password" type="password"  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                    <CheckBox text={"Agree to"} linkText="Terms & Conditions" link=""  onChange={(e)=>{setAgreement(e.target.value)}}  value={firstName}/>
                    
                    {/* Gaps are already defined in index.css inside theme directory */}
                    <GapBox className={"gap-y-md"} />

                    <Button text="Signup"></Button>
                    <Divider text="Or Signup with"></Divider>
                    <SocialSignInCard text="Google" Icon={GoogleSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                    <SocialSignInCard text="Facebook" Icon={FacebookSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                </form>
            </div>
        </div>
    </>;
}

export default Register;