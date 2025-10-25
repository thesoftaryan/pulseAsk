import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";

// Images
import PulseAskIcon from "../../../assets/PulseAskIcon.svg"

import ForgotPasswordStyle from "./ForgotPassword.module.css";




function ForgotPassword(){
    return (
        <>
            <div className={ForgotPasswordStyle["container"]}>
                <div className={ForgotPasswordStyle["header"]}>
                    <img src={PulseAskIcon} alt="Icon" className={ForgotPasswordStyle["icon"]}/>
                </div>
                <div className={ForgotPasswordStyle["inner-container"]}>
                    <h1 className={ForgotPasswordStyle["heading"]}>
                        Forgot Password
                    </h1>
                    <GapBox className="gap-y-md"></GapBox>
                    
                    <div className={ForgotPasswordStyle["form"]}>
                        <InputField placeholder="Email Address"/>
                        <GapBox className="gap-y-md"></GapBox>
                        <Button text="Send Link"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;