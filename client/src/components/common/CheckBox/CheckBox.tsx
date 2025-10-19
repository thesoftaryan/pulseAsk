import CheckBoxStyle from "./CheckBox.module.css";

interface CheckBoxProps{
    text:React.ReactNode;
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}


const CheckBox:React.FC<CheckBoxProps> = ({text, onChange})=>{
    return (
        <>
            <div className={CheckBoxStyle["checkbox-wrapper"]}>
                <input type="checkbox" className={CheckBoxStyle["checkbox"]} onChange={onChange}/>
                <span className={CheckBoxStyle["checkbox-text"]}>{text}</span>
            </div>
        </>
    );
}

export default CheckBox;