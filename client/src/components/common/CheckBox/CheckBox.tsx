import CheckBoxStyle from "./CheckBox.module.css";

interface CheckBoxProps{
    text:React.ReactNode;
    link?:string;
    linkText? : string;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    value?:string | number | readonly string[] | undefined;
}


const CheckBox:React.FC<CheckBoxProps> = ({text, linkText, link, onChange, value})=>{
    return (
        <>
            <div className={CheckBoxStyle["checkbox-wrapper"]}>
                <input type="checkbox" className={CheckBoxStyle["checkbox"]} onChange={onChange} value={value}/>
                <span className={CheckBoxStyle["checkbox-text"]}>{text} <a href={link} target="_blank">{linkText}</a></span>
            </div>
        </>
    );
}

export default CheckBox;