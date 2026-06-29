import LoaderScreenStyle from "./LoaderScreen.module.css";
import LoaderScreenGif from "../../../assets/loader_main.gif";

interface LoaderScreenProps{
    transparent?: boolean,
}
export const LoaderScreen:React.FC<LoaderScreenProps> = ({transparent})=>{
    return (
        <div className={`${LoaderScreenStyle["container"]} ${transparent? LoaderScreenStyle["transparent"]:""}`}>
            <img src={LoaderScreenGif} />
        </div>
    );
}