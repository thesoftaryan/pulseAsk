import InputField from "../../../components/common/InputField/InputField";
import Button from "../../../components/common/Button/Button";
import GapBox from "../../../components/common/GapBox/GapBox";

// Images
import PulseAskIcon from "../../../assets/PulseAskIcon.svg?react"

import ResetPasswordStyle from "./ResetPassword.module.css";




function ResetPassword(){
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
                        <InputField type="password" placeholder="Enter New Password"/>
                        <InputField type="password" placeholder="Confirm Password"/>
                        <GapBox className="gap-y-md"></GapBox>
                        <Button text="Reset password"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;