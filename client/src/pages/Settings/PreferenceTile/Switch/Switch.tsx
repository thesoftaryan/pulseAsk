import SwitchStyle from "./Switch.module.css";

export const Switch = ()=>{
    return (
        <div className={SwitchStyle["container"]}>
            <div className={SwitchStyle["background"]}>
            </div>
            <div className={SwitchStyle["foreground"]}></div>
        </div>
    );
}