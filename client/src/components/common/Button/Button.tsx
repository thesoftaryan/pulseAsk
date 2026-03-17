import ButtonStyle from "./Button.module.css"


interface ButtonProps{
    text : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
    disabled?:boolean;
    Icon? : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    level1? : boolean;
    level2?: boolean;
    className?: string;
    isSmall?: boolean;
    loading?: boolean;
}


const Button:React.FC<ButtonProps> = ({text, onClick, disabled=false, Icon, level1, level2, className, isSmall, loading})=>{
    return (
        <>
            <div className={ButtonStyle["button-wrapper"]}>
                
                <button disabled={disabled || loading} type="button" onClick={onClick} className={`${ButtonStyle["button"]} ${level1? ButtonStyle["level1"]:""} ${level2? ButtonStyle["level2"]:""} ${className} ${isSmall? ButtonStyle["small"]:""}`}>
                    {Icon && <Icon className={ButtonStyle["icon"]}/>}
                    <span className={`${ButtonStyle["button-text"]} ${loading? ButtonStyle["hide"]:""}`}>{text}</span>
                    <span className={`${ButtonStyle["spinner"]} ${loading? "":ButtonStyle["hide"]}`} />
                    {/* {!loading && <span className={ButtonStyle["button-text"]}>{text}</span>} 
                    {loading && <span className={ButtonStyle["spinner"]} />} */}
                </button>
            </div>
        </>
    ); 
}

export default Button;