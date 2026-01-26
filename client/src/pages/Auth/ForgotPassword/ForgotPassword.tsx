// React Parts
import { useState } from "react";

// Types
import type { ForgotPasswordFormData } from "../../../types/auth.types";

// Components
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";
import InlineError from "../../../components/common/InlineError/InlineError";

// Images
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react"

// Stylesheet
import ForgotPasswordStyle from "./ForgotPassword.module.css";
import { forgotPasswordValidator } from "./ForgotPassword.validator";
import { useForgotPasswordHandler } from "./ForgotPassword.handler";
import { BackButton } from "../../../components/common/BackButton/BackButton";




function ForgotPassword(){


    // {**************** ForgotPassword Logic : start ******************}
    
    const {forgotPasswordHandler} = useForgotPasswordHandler();

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

    // {**************** ForgotPassword Logic : end ******************}



    return (
        <>
            <div className={ForgotPasswordStyle["container"]}>
                <div className={ForgotPasswordStyle["header"]}>
                    <PulseAskIcon className={ForgotPasswordStyle["icon"]}/>
                    <BackButton text={"Go Back"} level1={true} extraClass={ForgotPasswordStyle["back-button"]}/>
                </div>
                <div className={ForgotPasswordStyle["inner-container"]}>
                    <h1 className={ForgotPasswordStyle["heading"]}>
                        Forgot Password
                    </h1>
                    <GapBox className="gap-y-md"></GapBox>
                    
                    <div className={ForgotPasswordStyle["form"]}>
                        <InputField isError={errors.email?.length} placeholder="Email Address" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                        {errors.email?.length && <InlineError message={errors.email}/>}
                        <GapBox className="gap-y-md"></GapBox>
                        <Button text="Send Link" onClick={handleForgotPassword}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;