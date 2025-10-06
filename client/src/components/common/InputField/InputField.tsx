import InputFieldStyles from "./InputField.module.css";
import ClosedPasswordIcon from "/src/assets/icons/password.svg?react"

interface InputFieldProps{
    type?:string;
    name?:string;
    placeholder: string;
    value?:string;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    disabled?:boolean;
}

const InputField: React.FC<InputFieldProps> = ({placeholder, type="text", value, onChange, name, disabled=false,})=>{
    return <>
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} className={InputFieldStyles["input-name"]}/>
        <ClosedPasswordIcon width={110} height={110} className={InputFieldStyles["svg-icon"]}/>
    </>;
}

export default InputField;