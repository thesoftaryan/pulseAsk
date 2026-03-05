import PreferenceTileStyle from "./PreferenceTile.module.css";

export const PreferenceTile = ()=>{
    return (
        <div className={PreferenceTileStyle["container"]}>
            <div className={PreferenceTileStyle["statement"]}></div>
            <div className={PreferenceTileStyle["switch"]}></div>
        </div>
    );
}