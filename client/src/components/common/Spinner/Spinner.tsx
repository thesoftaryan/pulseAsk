import SpinnerStyle from "./Spinner.module.css";

export const Spinner = ()=>{
    return (
        <div className={SpinnerStyle["container"]}>
            <span className={`${SpinnerStyle["spinner"]}`} />
        </div>
    );
}