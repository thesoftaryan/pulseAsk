import { FetchProfilePayload } from "../types/profile.type";


export const validateFetchProfile = (body : FetchProfilePayload)=>{
    const errors:Record<string, string> = {};
    const {userName} = body;
    if(!userName){
        errors.userName = "userName is required";
    }else if(userName.length<3){
        errors.userName = "userName must be of atleast 3 characters";
    }
    return errors;
}