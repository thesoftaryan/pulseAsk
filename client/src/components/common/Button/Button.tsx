import ButtonStyle from "./Button.module.css"


interface ButtonProps{
    text : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
    disabled?:boolean;
    Icon? : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    level1? : boolean;
    className?: string;
}


const Button:React.FC<ButtonProps> = ({text, onClick, disabled=false, Icon, level1, className})=>{
    return (
        <>
            <div className={ButtonStyle["button-wrapper"]}>
                
                <button disabled={disabled} type="button" onClick={onClick} className={`${ButtonStyle["button"]} ${(disabled? ButtonStyle["disabled"]:"")} ${level1? ButtonStyle["level1"]:""} ${className}`}>
                    {Icon && <Icon className={ButtonStyle["icon"]}/>}{text}
                </button>
            </div>
        </>
    ); 
}

export default Button;