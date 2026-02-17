import type { ChainedCommands } from "@tiptap/react";
import { uploadImageAPI } from "../../../../api/general.api";
import { parseErrorResponse, parseSuccessResponse } from "../../../../services/apiResponseParser.service";
import type { UploadImageResponse } from "../../../../types/apiResponse.types";
import { showToast } from "../../../../utils/toast.util";

export const uploadImageHandler = async (file : File, editor:ChainedCommands) =>{
    try{
        const formData = new FormData();
        formData.append("image", file);

        const response  = await uploadImageAPI(formData);

        const parsed = parseSuccessResponse<UploadImageResponse>(response);

        editor.setImage({
          src : parsed.data?.image_url??"",
        }).run();
        showToast.success(parsed.message);
    }catch(error){
        const parsed = parseErrorResponse(error);
        showToast.error(parsed.message);
    }

}