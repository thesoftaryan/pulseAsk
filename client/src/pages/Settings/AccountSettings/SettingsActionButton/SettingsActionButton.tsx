import SettingsActionButtonStyle from "./SettingsActionButton.module.css";

interface SettingsActionButton{
    text : string;
    onClick? : React.MouseEventHandler<HTMLButtonElement>;
    disabled?:boolean;
    Icon? : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    color? : string;
    className?: string;
    isSmall?: boolean;
    level2?: boolean;
}


export const SettingsActionButton:React.FC<SettingsActionButton> = ({text, onClick, disabled=false, Icon, color, className, isSmall})=>{
    return (
        <>
            <div className={SettingsActionButtonStyle["button-wrapper"]}>
                <button  style={{backgroundColor:color}} disabled={disabled} type="button" onClick={onClick} className={`${SettingsActionButtonStyle["button"]} ${(disabled? SettingsActionButtonStyle["disabled"]:"")} ${className} ${isSmall? SettingsActionButtonStyle["small"]:""}`}>
                    <div className={SettingsActionButtonStyle["text"]}>
                        {text}
                    </div>
                    {Icon && (<div className={SettingsActionButtonStyle["icon-container"]}><Icon className={SettingsActionButtonStyle["icon"]} style={{color: color}}/></div>)}
                </button>
            </div>
        </>
    ); 
}