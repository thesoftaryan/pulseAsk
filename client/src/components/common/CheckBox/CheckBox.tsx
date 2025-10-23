import CheckBoxStyle from "./CheckBox.module.css";

interface CheckBoxProps{
    text:React.ReactNode;
    link?:string;
    linkText? : string;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}


const CheckBox:React.FC<CheckBoxProps> = ({text, linkText, link, onChange})=>{
    return (
        <>
            <div className={CheckBoxStyle["checkbox-wrapper"]}>
                <input type="checkbox" className={CheckBoxStyle["checkbox"]} onChange={onChange}/>
                <span className={CheckBoxStyle["checkbox-text"]}>{text} <a href={link} target="_blank">{linkText}</a></span>
            </div>
        </>
    );
}

export default CheckBox;