import VerifyEmailStyle from "./VerifyEmail.module.css";

import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";

function VerifyEmail(){
    return (
        <>
        <div className={VerifyEmailStyle["container"]}>
            <div className={VerifyEmailStyle["header"]}>
                <PulseAskIcon className={VerifyEmailStyle["icon"]}/>
            </div>
            <div className={VerifyEmailStyle["inner-container"]}>
                <h1 className={VerifyEmailStyle["heading"]}> Verify Your Email</h1>
                <GapBox className="gap-y-lg"/>
                
                <InputField placeholder="Enter Verification Code"/>
                <GapBox className="gap-y-md"/>
                <a href="#" className={VerifyEmailStyle["resend-link"]}>Resend Verification Code</a>
                <GapBox className="gap-y-md"/>
                <Button text="Verify"/>
            </div>
        </div>
        </>
    );
}


export default VerifyEmail;