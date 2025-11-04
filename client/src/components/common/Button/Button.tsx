import ButtonStyle from "./Button.module.css"


interface ButtonProps{
    text : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
}


const Button:React.FC<ButtonProps> = ({text, onClick})=>{
    return (
        <>
            <div className={ButtonStyle["button-wrapper"]}>
                <button type="button" onClick={onClick} className={ButtonStyle["button"]}>
                    {text}
                </button>
            </div>
        </>
    ); 
}

export default Button;