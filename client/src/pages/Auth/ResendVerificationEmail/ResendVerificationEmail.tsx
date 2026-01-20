// React
import { useState } from "react";

//Type
import type { ResendVerificationEmailFormData } from "../../../types/auth";

// Stylesheet
import ResendVerificationEmailStyle from "./ResendVerificationEmail.module.css";

// Components
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";
import InlineError from "../../../components/common/InlineError/InlineError";
import { verifyEmailValidator } from "./ResendVerificationEmail.validator";
import { resendVerificationEmailHandler } from "./ResendVerificationEmail.handler";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authRoutes } from "../../../routes/routesConstants";


function ResendVerificationEmail(){

    const navigator = useNavigate();

    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Partial<ResendVerificationEmailFormData>>({});


    const handleResendVerificationEmail = ()=>{
        const data = {email};
        const error = verifyEmailValidator(data);
        setErrors(error);

        if(Object.keys(error).length === 0){
            resendVerificationEmailHandler(data);
        }
    }

    return (
        <>
        <div className={ResendVerificationEmailStyle["container"]}>
            <div className={ResendVerificationEmailStyle["header"]}>
                <PulseAskIcon className={ResendVerificationEmailStyle["icon"]}/>
            </div>
            <div className={ResendVerificationEmailStyle["inner-container"]}>
            {
                (!status || status!=="success")?  
                <>
                    <InlineError message="Invalid or expired link"/>
                    <GapBox className="gap-y-md"/>

                    <h1 className={ResendVerificationEmailStyle["heading"]}> Resend Verification Link</h1>
                    <GapBox className="gap-y-lg"/>
                    
                    <InputField placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    {errors.email && <InlineError message={errors.email}/>}
                    <GapBox className="gap-y-md"/>
                    <Button text="Resend Link" onClick={handleResendVerificationEmail}/>
                </>
                :
                <>
                    <h2 className={ResendVerificationEmailStyle["heading"]}> Email verification successfull, you can now login.</h2>
                    <GapBox className="gap-y-md"/>
                    <Button text="Login" onClick={()=>{navigator(authRoutes.login)}}/>
                </>
            }
            </div>
        </div>
        </>
    );
}


export default ResendVerificationEmail;