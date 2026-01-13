// React
import { useState } from "react";

//Type
import type { VerifyEmailFormData } from "../../../types/auth";

// Stylesheet
import VerifyEmailStyle from "./VerifyEmail.module.css";

// Components
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";
import { verifyEmailValidator } from "./VerifyEmail.validator";
import { verifyEmailHandler } from "./VerifyEmail.handler";
import ErrorText from "../../../components/common/InlineError/InlineError";
import { useSearchParams } from "react-router-dom";


function VerifyEmail(){

    const [searchParams] = useSearchParams();
    const status = searchParams.get("status");

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Partial<VerifyEmailFormData>>({});


    const handleVerifyEmail = ()=>{
        const data = {email};
        const error = verifyEmailValidator(data);
        setErrors(error);

        if(Object.keys(error).length === 0){
            verifyEmailHandler(data);
        }
    }

    return (
        <>
        <div className={VerifyEmailStyle["container"]}>
            <div className={VerifyEmailStyle["header"]}>
                <PulseAskIcon className={VerifyEmailStyle["icon"]}/>
            </div>
            <div className={VerifyEmailStyle["inner-container"]}>
            {
                (!status || status!=="success")?  
                <>
                    <h1 className={VerifyEmailStyle["heading"]}> Resend Verification Link</h1>
                    <GapBox className="gap-y-lg"/>
                    
                    <InputField placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    {errors.email && <ErrorText message={errors.email}/>}
                    <GapBox className="gap-y-md"/>
                    <Button text="Resend Link" onClick={handleVerifyEmail}/>
                </>
                :
                <>
                    <h2 className={VerifyEmailStyle["heading"]}> Email verification successfull, you can now login.</h2>
                    <GapBox className="gap-y-md"/>
                    <Button text="Login" onClick={()=>{}}/>
                </>
            }
            </div>
        </div>
        </>
    );
}


export default VerifyEmail;