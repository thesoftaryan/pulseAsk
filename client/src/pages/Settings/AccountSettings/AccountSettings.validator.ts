import type { UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../../../types/ApiRequest/setting.type";
import { isSpecialNumericString, isValidName, isValidURL, isValidUserName } from "../../../utils/validationHelpers.util";


export const basicProfileValidator = (data : UpdateBasicProfilePayload)=>{
    const errors:Record<string, string> = {};

    const {userName, firstName, lastName, degree, college} = data;


    if(!userName || userName.length < 3){
        errors.userName = "User Name must be of atleast 3 characters.";
    }else if(!isValidUserName(userName)){
        errors.userName = "Only Numbers, Letters and Underscore allowed";
    }else if(!isValidName(firstName)){
        errors.firstName = "First Name is not valid, only Characters and no whitespaces allowed";
    }else if(!isValidName(lastName)){
        errors.lastName = "Last Name is not valid, only Characters and no whitespaces allowed";
    }else if(degree && isSpecialNumericString(degree)){
        errors.degree = "Degree can't contain any special character or number";
    }else if(college && isSpecialNumericString(college)){
        errors.college = "College name can't contain any special character or number";
    }
    return errors;
}

export const socialProfileValidator = (data : UpdateSocialProfilePayload)=>{
    const errors:Record<string, string> = {};

    const {instagram, facebook, linkedin, youtube} = data;
    
    if(instagram && isValidURL(instagram)){
        errors.instagram = "Enter only username, not full url";
    }else if(facebook && isValidURL(facebook)){
        errors.facebook = "Enter only username, not full url";
    }else if(linkedin && isValidURL(linkedin)){
        errors.linkedin = "Enter only username, not full url";
    }else if(youtube && isValidURL(youtube)){
        errors.youtube = "Enter only username, not full url";
    }

    return errors;
}