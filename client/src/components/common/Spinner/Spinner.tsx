import SpinnerStyle from "./Spinner.module.css";

export const Spinner = ({small} : {small?: boolean})=>{
    return (
        <div className={SpinnerStyle["container"]}>
            <div className={`${SpinnerStyle["spinner"]} ${small? SpinnerStyle["small"]:""}`} />
        </div>
    );
}