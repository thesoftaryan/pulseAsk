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
import BannerImageLight from "../../../assets/images/Authentication/banner-light.png";
// import BannerImageDark from "../../../assets/images/Authentication/banner-dark.png";

// Style
import LoginStyle from "./Login.module.css";



function Login() {
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
                    <p className={LoginStyle["signup"]}>Don't have an account? <a href="#">SignUp</a></p>
                </div>



                <div className={LoginStyle["login-form"]}>
                    <InputField placeholder="Email" type="email" />
                    <InputField placeholder="Password" type="password" />
                    <CheckBox text={"Remember me"}></CheckBox>

                    {/* Gaps are already defined in index.css inside theme directory */}
                    <GapBox className={"gap-y-medium"} />

                    <Button text="Login"></Button>
                    <Divider text="Or login with"></Divider>
                    <SocialSignInCard text="Google" Icon={GoogleSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                    <SocialSignInCard text="Facebook" Icon={FacebookSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                </div>
            </div>
        </div>
    </>;
}

export default Login;