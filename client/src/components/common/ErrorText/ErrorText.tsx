
import ErrorTextStyle from "./ErrorText.module.css";

interface ErrorTextProps{
    message?:string;
};

const ErrorText : React.FC<ErrorTextProps> = ({message})=>{
    if(!message) return null;

    return (
        <>
            <div className={ErrorTextStyle["wrapper"]}>
                <p className={ErrorTextStyle["error-text"]}>
                {message}
                </p>
            </div>
        </>
    );
}


export default ErrorText;