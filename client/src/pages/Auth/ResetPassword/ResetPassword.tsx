// React
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Logical Parts
import { resetPasswordValidator } from "./ResetPassword.validator";
import { useResetPasswordHandler } from "./ResetPassword.handler";
import type { ResetPasswordFormData } from "../../../types/ApiRequest/auth.type";

// Components
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";

// Images
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react"

// Stylesheet
import ResetPasswordStyle from "./ResetPassword.module.css";
import InlineError from "../../../components/common/InlineError/InlineError";

// Routes
import { authRoutes } from "../../../routes/routesConstants";
import { BackButton } from "../../../components/common/BackButton/BackButton";
import { useAppSelector } from "../../../hooks/store.hook";




function ResetPassword(){

        // {**************** ResetPassword Logic : start ******************}
        
            const [searchParams] = useSearchParams();
            const token = searchParams.get("token");
            
            const state = useAppSelector(state => state.auth);
            
            const {resetPasswordHandler} = useResetPasswordHandler();

            const [password, setPassword] = useState("");
            const [confirmPassword, setConfirmPassword] = useState("");
            const [errors, setErrors] = useState<Partial<ResetPasswordFormData>>({});

            const handleReset = ()=>{
                const data = {password, confirmPassword: confirmPassword, token};
                const error = resetPasswordValidator(data);
                setErrors(error);

                if(Object.keys(error).length === 0){
                    resetPasswordHandler(data);
                }
            }
    
        // {**************** ResetPassword Logic : end ******************}
    



    return (
        <>
            <div className={ResetPasswordStyle["container"]}>
                <div className={ResetPasswordStyle["header"]}>
                    <PulseAskIcon className={ResetPasswordStyle["icon"]}/>
                    <BackButton text={"Go Back"} level1={true}/>
                </div>
                <div className={ResetPasswordStyle["inner-container"]}>
                    <h1 className={ResetPasswordStyle["heading"]}>
                        Create New Password
                    </h1>
                    <GapBox className="gap-y-md"></GapBox>

                    {errors.token && 
                    <>
                    <div className={ResetPasswordStyle["token-error"]}>
                        <InlineError message={errors.token}/>
                        <Link to={authRoutes.forgotPassword}> Request new link</Link>
                    </div>
                    </>
                    }
                    
                    <div className={ResetPasswordStyle["form"]}>
                        <InputField isError={errors.password?.length} type="password" placeholder="Enter New Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        {errors.password && <InlineError message={errors.password}/>}
                        <InputField isError={errors.confirmPassword?.length} type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                        {errors.confirmPassword && <InlineError message={errors.confirmPassword}/>}
                        <GapBox className="gap-y-md"></GapBox>
                        <Button text="Reset password" onClick={handleReset} disabled={state.status==="loading"}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;