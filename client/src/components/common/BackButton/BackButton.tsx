import { useNavigate } from "react-router-dom";
import LeftChevronIcon from "../../../assets/icons/Chevron left.svg?react";
import BackButtonStyle from "./BackButton.module.css"

export const BackButton = ({text = "Go Back", level1 = false, extraClass = ""})=>{

    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate(-1);
    }
    return (
        <button className={`${BackButtonStyle["back-button"]} ${BackButtonStyle[(level1)? "level1" : ""]} ${extraClass}`} onClick={handleBack}>
            <div className={BackButtonStyle["chevron-left"]}>
                <LeftChevronIcon/>
            </div>
            <div className={BackButtonStyle["back-button-text"]}>
                {text}
            </div>
        </button>
    );
}