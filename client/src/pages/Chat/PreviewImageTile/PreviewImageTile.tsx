import PreviewImageTileStyle from "./PreviewImageTile.module.css";

import CloseIcon from "../../../assets/icons/general/close.svg?react";
import { Spinner } from "../../../components/common/Spinner/Spinner";

interface PreviewImageTileProps{
    imageUrl: string;
    uploading: boolean;
    onDelete: ()=>void;
}

export const PreviewImageTile:React.FC<PreviewImageTileProps> = ({imageUrl, uploading, onDelete})=>{
    return (
        <div className={PreviewImageTileStyle["container"]}>
            {
                uploading
                &&
                <div className={PreviewImageTileStyle["spinner"]}>
                    <Spinner/>
                </div>
            }
            <img src={imageUrl} className={PreviewImageTileStyle["image"]}/>
            <CloseIcon onClick={uploading? undefined:onDelete} className={PreviewImageTileStyle["close-icon"]}/>
        </div>
    );
}