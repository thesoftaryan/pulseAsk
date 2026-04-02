import PreferenceTileStyle from "./PreferenceTile.module.css";
import { Switch } from "./Switch/Switch";

interface PreferenceTileProps{
    active: boolean;
    onClick?:()=>void;
    text: string;
}

export const PreferenceTile:React.FC<PreferenceTileProps> = ({text, onClick, active})=>{
    return (
        <div className={PreferenceTileStyle["container"]}>
            <div className={PreferenceTileStyle["statement"]}>{text}</div>
            <div onClick={onClick} className={PreferenceTileStyle["switch"]}>
                <Switch active={active}/>
            </div>
        </div>
    );
}