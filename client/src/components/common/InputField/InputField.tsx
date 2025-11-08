import { useState } from "react";
import InputFieldStyle from "./InputField.module.css";
import ClosedPasswordIcon from "/src/assets/icons/password_hidden.svg?react"
import ClearPasswordIcon from "/src/assets/icons/password_clear.svg?react"

interface InputFieldProps{
    type?:string;
    name?:string;
    placeholder: string;
    value?:string;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    disabled?:boolean;
    isError?:number;
}

const InputField: React.FC<InputFieldProps> = ({placeholder, type="text", value, onChange, name, disabled=false, isError=0})=>{
    const [hidden, sethidden] = useState(type==="password");
    return <>
        <div className={InputFieldStyle["input-wrapper"]}>
            <input type={type==="password"? (hidden? type:"text"):type} name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} className={`${InputFieldStyle["input-field"]} ${(isError)? InputFieldStyle["error-input-field"]:""}`}/>
            { type === "password" && (hidden? <ClosedPasswordIcon className={InputFieldStyle["eye-icon"]} onClick={()=>{sethidden(!hidden)}}/> : <ClearPasswordIcon className={InputFieldStyle["eye-icon"]} onClick={()=>{sethidden(!hidden)}}/>)}
        </div>
    </>;
}

export default InputField;