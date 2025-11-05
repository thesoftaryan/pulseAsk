import ButtonStyle from "./Button.module.css"


interface ButtonProps{
    text : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
    disabled?:boolean;
}


const Button:React.FC<ButtonProps> = ({text, onClick, disabled=false})=>{
    return (
        <>
            <div className={ButtonStyle["button-wrapper"]}>
                <button disabled={disabled} type="button" onClick={onClick} className={ButtonStyle["button"]}>
                    {text}
                </button>
            </div>
        </>
    ); 
}

export default Button;