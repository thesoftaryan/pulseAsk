import ButtonStyle from "./Button.module.css"


interface ButtonProps{
    text : string;
}


const Button:React.FC<ButtonProps> = ({text})=>{
    return (
        <>
            <div className={ButtonStyle["button-wrapper"]}>
                <button type="button" className={ButtonStyle["button"]}>
                    {text}
                </button>
            </div>
        </>
    ); 
}

export default Button;