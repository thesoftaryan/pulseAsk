import InputField from "../../../components/common/InputField/InputField";
import CheckBox from "../../../components/common/CheckBox/CheckBox";
import Button from "../../../components/common/Button/Button";
import Divider from "../../../components/common/Divider/Divider";
import SocialSignInCard from "../../../components/common/SocialSignInCard/SocialSignInCard";
import GapBox from "../../../components/common/GapBox/GapBox";

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
                    <p className={RegisterStyle["login"]}>Already have an account? <a href="#">Login</a></p>
                </div>



                <form className={RegisterStyle["register-form"]}>
                    <div className={RegisterStyle["name-input-container"]}>
                        <InputField placeholder="First Name"/>
                        <InputField placeholder="Last Name"/>
                    </div>
                    <InputField placeholder="Email" type="email" />
                    <InputField placeholder="Password" type="password" />
                    <CheckBox text={"Agree to"} linkText="Terms & Conditions" link="https://google.com"></CheckBox>
                    
                    {/* Gaps are already defined in index.css inside theme directory */}
                    <GapBox className={"gap-y-medium"} />

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