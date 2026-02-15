import { uploadImageAPI } from "../../../../api/general.api";
import { parseSuccessResponse } from "../../../../services/apiResponseParser.service";
import type { UploadImageResponse } from "../../../../types/apiResponse.types";

export const uploadImageHandler = async (file : File) : Promise<string> =>{
    
    const formData = new FormData();
    formData.append("image", file);

    const response  = await uploadImageAPI(formData);

    const parsed = parseSuccessResponse<UploadImageResponse>(response);

    return parsed.data?.imageUrl??"";
}