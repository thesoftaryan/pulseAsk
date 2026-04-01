import { useState } from "react";
import { showToast } from "../utils/toast.util";
import imageCompression from "browser-image-compression";
import { uploadImageAPI } from "../api/general.api";
import { parseErrorResponse, parseSuccessResponse } from "../services/apiResponseParser.service";
import type { UploadImageResponse } from "../types/ApiResponse/index.type";

export const useUploadImage = ()=>{
    const [uploading, setUploading] = useState(false);

    const uploadImageHandler = async (file?:File, compress:boolean = true,) : Promise<string|undefined>=>{
        try{
            if(!file) throw new Error("No file Provided");
            if (!file.type.startsWith("image/")){
                throw new Error("Only images are allowed");
            }
            if(file.size > 5*1024*1024){
                throw new Error("Max file size is 5MB");
            }

            setUploading(true);

            if(compress){
                file = await imageCompression(file, {
                maxSizeMB: 2,
                maxWidthOrHeight: 1280,
                useWebWorker: true,
                });
                // console.log("Compressed file:", file);
                // console.log("Compressed size:", file.size);
            }
            
            const formData = new FormData();
            formData.append("image", file);

            const response  = await uploadImageAPI(formData);

            const parsed = parseSuccessResponse<UploadImageResponse>(response);
            // await submitFunction(data);
            return parsed.data?.imageUrl;
        }catch(e:any){
            const err = parseErrorResponse(e);
            showToast.error(err.message);
        }finally{
            setUploading(false);
        }
    }

    return {uploadImageHandler, uploading};
}