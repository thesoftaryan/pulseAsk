import ErrorIcon from "../../../assets/icons/error.svg?react";

import InlineErrorStyle from "./InlineError.module.css";

interface InlineErrorProps{
    message?:string;
};

const InlineError : React.FC<InlineErrorProps> = ({message})=>{
    if(!message) return null;

    return (
        <>
            <div className={InlineErrorStyle["wrapper"]}>
                <ErrorIcon className={InlineErrorStyle["error-icon"]}/>
                <p className={InlineErrorStyle["error-text"]}>
                {message}
                </p>
            </div>
        </>
    );
}


export default InlineError;