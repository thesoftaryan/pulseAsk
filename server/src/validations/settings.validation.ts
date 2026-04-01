import { Types } from "mongoose";
import { AddKTagPayload, RemoveKTagPayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload, UpdateUserProfileImagePayload } from "../types/settings.type";
import { isValidUserName, isValidName, isSpecialNumericString, isValidURL } from "../utils/validation.util";

export const basicProfileValidator = (data : UpdateBasicProfilePayload)=>{
    const errors:Record<string, string> = {};

    const {userName, firstName, lastName, degree, college} = data;


    if(!userName || userName.length < 3){
        errors.userName = "User Name must be of atleast 3 characters.";
    }else if(userName.length>20){
        errors.userName = "User Name must be of atmost 20 characters.";
    }else if(!isValidUserName(userName)){
        errors.userName = "Only Numbers, Letters and Underscore allowed";
    }else if(!isValidName(firstName)){
        errors.firstName = "First Name is not valid, only Characters and no whitespaces allowed";
    }else if(lastName && !isValidName(lastName)){
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
        errors.instagram = "Enter only instagram username";
    }else if(facebook && isValidURL(facebook)){
        errors.facebook = "Enter only facebook username";
    }else if(linkedin && isValidURL(linkedin)){
        errors.linkedin = "Enter only linkedin username";
    }else if(youtube && isValidURL(youtube)){
        errors.youtube = "Enter only youtube username";
    }

    return errors;
}

export const addKTagValidator = (data : AddKTagPayload)=>{
    const errors:Record<string, string> = {};

    const {name} = data;

    if(!name || (name.trim()).length<3){
        errors.name = "name must be of atleast 3 characters";
    }
    return errors;
}

export const removeKTagValidator = (data : RemoveKTagPayload)=>{
    const errors:Record<string, string> = {};

    const {kTid} = data;

    if(!kTid){
        errors.kTid = "Knowledge Tag is required";
    }else if(!Types.ObjectId.isValid(kTid)){
        errors.kTid = "Invalid Tag Id";
        errors.message = "Invalid Tag Id";
    }
    return errors;
}

export const updateUserProfileImageValidator = (data : UpdateUserProfileImagePayload)=>{
    const errors:Record<string, string> = {};

    const {imageUrl} = data;

    if(!imageUrl){
        errors.imageUrl = "imageUrl is required";
    }
    return errors;
}