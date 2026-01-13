// React Parts
import { useState } from "react";

// Types
import type { ForgotPasswordFormData } from "../../../types/auth";

// Components
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";
import ErrorText from "../../../components/common/InlineError/InlineError";

// Images
import PulseAskIcon from "../../../assets/PulseAskIcon.svg"

// Stylesheet
import ForgotPasswordStyle from "./ForgotPassword.module.css";
import { forgotPasswordValidator } from "./ForgotPassword.validator";
import { forgotPasswordHandler } from "./ForgotPassword.handler";




function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Partial<ForgotPasswordFormData>>({});

    const handleForgotPassword = ()=>{
        const data : ForgotPasswordFormData = {email};
        const error = forgotPasswordValidator(data);
        setErrors(error);

        if(Object.keys(error).length === 0){
            forgotPasswordHandler(data);
        }
    }

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
                        <InputField isError={errors.email?.length} placeholder="Email Address" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        {errors.email?.length && <ErrorText message={errors.email}/>}
                        <GapBox className="gap-y-md"></GapBox>
                        <Button text="Send Link" onClick={handleForgotPassword}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;