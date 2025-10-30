// React Router
import {Link} from "react-router-dom";


// Components
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
    // const navigate = useNavigate();
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



                <form className={LoginStyle["login-form"]}>
                    <InputField placeholder="Email" type="email" />
                    <InputField placeholder="Password" type="password" />
                    <CheckBox text={"Remember me"}></CheckBox>

                    {/* Gaps are already defined in index.css inside theme directory */}
                    <GapBox className={"gap-y-medium"} />

                    <Button text="Login"></Button>

                    <GapBox className={"gap-y-md"} />
                    <Link className={LoginStyle["forgot-password"]} to="/auth/forgot-password" >Forgot password?</Link>

                    <Divider text="Or login with"></Divider>
                    <SocialSignInCard text="Google" Icon={GoogleSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                    <SocialSignInCard text="Facebook" Icon={FacebookSocialSignInIcon} onClick={() => { console.log("Social sign in button clicked.") }} />
                </form>
            </div>
        </div>
    </>;
}

export default Login;