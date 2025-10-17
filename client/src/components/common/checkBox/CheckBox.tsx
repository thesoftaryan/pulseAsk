import CheckBoxStyle from "./CheckBox.module.css";

const CheckBox = ()=>{
    return (
        <>
            <div className={CheckBoxStyle["checkbox-wrapper"]}>
                <input type="checkbox" className={CheckBoxStyle["checkbox"]}/>
                <p>Remember me</p>
            </div>
        </>
    );
}

export default CheckBox;