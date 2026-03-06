import PreferenceTileStyle from "./PreferenceTile.module.css";
import { Switch } from "./Switch/Switch";

interface PreferenceTileProps{
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
}

export const PreferenceTile:React.FC<PreferenceTileProps> = ({text, active, setActive})=>{
    return (
        <div className={PreferenceTileStyle["container"]}>
            <div className={PreferenceTileStyle["statement"]}>{text}</div>
            <div className={PreferenceTileStyle["switch"]} onClick={()=>setActive(!active)}>
                <Switch active={active}/>
            </div>
        </div>
    );
}