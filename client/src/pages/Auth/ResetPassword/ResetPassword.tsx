// React
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// Logical Parts
import { resetPasswordValidator } from "./ResetPassword.validator";
import { resetPasswordHandler } from "./ResetPassword.handler";
import type { ResetPasswordFormData } from "../../../types/auth";

// Components
import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";

// Images
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react"

// Stylesheet
import ResetPasswordStyle from "./ResetPassword.module.css";
import ErrorText from "../../../components/common/ErrorText/ErrorText";




function ResetPassword(){

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Partial<ResetPasswordFormData>>({});

    const handleReset = ()=>{
        const [searchParams] = useSearchParams();
        const token = searchParams.get("token");
        const data = {password, confirmPassword, token};
        const error = resetPasswordValidator(data);
        setErrors(error);

        if(Object.keys(error).length === 0){
            resetPasswordHandler(data);
        }
    }

    return (
        <>
            <div className={ResetPasswordStyle["container"]}>
                <div className={ResetPasswordStyle["header"]}>
                    <PulseAskIcon className={ResetPasswordStyle["icon"]}/>
                </div>
                <div className={ResetPasswordStyle["inner-container"]}>
                    <h1 className={ResetPasswordStyle["heading"]}>
                        Create New Password
                    </h1>
                    <GapBox className="gap-y-md"></GapBox>
                    
                    <div className={ResetPasswordStyle["form"]}>
                        <InputField isError={errors.password?.length} type="password" placeholder="Enter New Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        {errors.password && <ErrorText message={errors.password}/>}
                        <InputField isError={errors.confirmPassword?.length} type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                        {errors.confirmPassword && <ErrorText message={errors.confirmPassword}/>}
                        <GapBox className="gap-y-md"></GapBox>
                        <Button text="Reset password" onClick={handleReset}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;