import RoundedButtonStyle from "./RoundedButton.module.css"


interface ButtonProps{
    text : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
    disabled?:boolean;
    Icon? : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    active? : boolean;
    className?: string;
    isSmall?: boolean;
    level2?: boolean;
}


const Button:React.FC<ButtonProps> = ({text, onClick, disabled=false, Icon, active=false, className, isSmall, level2})=>{
    return (
        <>
            <div className={RoundedButtonStyle["button-wrapper"]}>
                <button disabled={disabled} type="button" onClick={onClick} className={`${RoundedButtonStyle["button"]} ${(disabled? RoundedButtonStyle["disabled"]:"")} ${active? RoundedButtonStyle["active"]:""} ${className} ${isSmall? RoundedButtonStyle["small"]:""} ${level2? RoundedButtonStyle["level2"]:""}`}>
                    {Icon && <Icon className={RoundedButtonStyle["icon"]}/>}
                    <div className={RoundedButtonStyle["text"]}>
                        {text}
                    </div>
                </button>
            </div>
        </>
    ); 
}

export default Button;