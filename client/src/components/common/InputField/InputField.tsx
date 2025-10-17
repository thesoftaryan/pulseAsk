import { useState } from "react";
import InputFieldStyles from "./InputField.module.css";
import ClosedPasswordIcon from "/src/assets/icons/password_hidden.svg?react"
import ClearPasswordIcon from "/src/assets/icons/password_clear.svg?react"

interface InputFieldProps{
    type?:string;
    name?:string;
    placeholder: string;
    value?:string;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    disabled?:boolean;
}

const InputField: React.FC<InputFieldProps> = ({placeholder, type="text", value, onChange, name, disabled=false,})=>{
    const [hidden, sethidden] = useState(type==="password");
    return <>
        <div className={InputFieldStyles["input-wrapper"]}>
            <input type={type==="password"? (hidden? type:"text"):type} name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} className={InputFieldStyles["input-field"]}/>
            { type === "password" && (hidden? <ClosedPasswordIcon className={InputFieldStyles["eye-icon"]} onClick={()=>{sethidden(!hidden)}}/> : <ClearPasswordIcon className={InputFieldStyles["eye-icon"]} onClick={()=>{sethidden(!hidden)}}/>)}
        </div>
    </>;
}

export default InputField;