// React
import { useState } from "react";

//Type
import type { ResendVerificationEmailFormData } from "../../../types/ApiRequest/auth.type";

// Stylesheet
import ResendVerificationEmailStyle from "./ResendVerificationEmail.module.css";

// Components
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react";
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";
import InlineError from "../../../components/common/InlineError/InlineError";
import { verifyEmailValidator } from "./ResendVerificationEmail.validator";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authRoutes } from "../../../routes/routesConstants";
import { useResendVerficationEmailHandler } from "./ResendVerificationEmail.handler";
import { BackButton } from "../../../components/common/BackButton/BackButton";
import { useAppSelector } from "../../../hooks/store.hook";


function ResendVerificationEmail(){


        // {**************** ResendVerificationEmail Logic : start ******************}
            const navigator = useNavigate();

            const [searchParams] = useSearchParams();
            const status = searchParams.get("status");

            const state = useAppSelector(state => state.auth);
            
            const {resendVerificationEmailHandler} = useResendVerficationEmailHandler();

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

        // {**************** ResendVerificationEmail Logic : end ******************}
    



    return (
        <>
        <div className={ResendVerificationEmailStyle["container"]}>
            <div className={ResendVerificationEmailStyle["header"]}>
                <PulseAskIcon className={ResendVerificationEmailStyle["icon"]}/>
                <BackButton text={"Go Back"} level1={true}/>
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
                    <div  className={ResendVerificationEmailStyle["button"]} >
                        <Button text="Resend Link" onClick={handleResendVerificationEmail}/>
                    </div>
                </>
                :
                <>
                    <h2 className={ResendVerificationEmailStyle["heading"]}> Email verification successfull, you can now login.</h2>
                    <GapBox className="gap-y-md"/>
                    <div  className={ResendVerificationEmailStyle["button"]} >
                        <Button text="Login" onClick={()=>{navigator(authRoutes.login)}} disabled={state.status==="loading"}/>
                    </div>
                </>
            }
            </div>
        </div>
        </>
    );
}


export default ResendVerificationEmail;