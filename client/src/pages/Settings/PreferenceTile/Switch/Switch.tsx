import SwitchStyle from "./Switch.module.css";

interface SwitchProps{
    active?: boolean;
}

export const Switch:React.FC<SwitchProps> = ({active})=>{
    return (
        <div className={SwitchStyle["container"]}>
            <div className={`${SwitchStyle["background"]} ${active ? SwitchStyle["active-background"] : ""}`}>
                <div className={`${SwitchStyle["foreground"]} ${active ? SwitchStyle["active-foreground"] : ""}`}></div>
            </div>
        </div>
    );
}