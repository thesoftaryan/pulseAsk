import type { TagInterface } from "../../models/Tag.model"; 
import { PaymentPreferencesInterface, NotificationPreferencesInterface, ChatPreferencesInterface } from "../../models/User.model";

/* **************** Account Interfaces *************** */
export interface UpdateUserProfileImageResponse{}

export interface UpdateBasicProfileResponse{
    userName: string;
    firstName: string;
    lastName: string;
    degree: string;
    college:string;
    descriptionHTML: string;
    descriptionJSON: string;
}

export interface UpdateSocialProfileResponse{
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
}

export interface AddKTagResponse extends TagInterface{}

export interface RemoveKTagResponse{}


/* **************** Payment Interfaces *************** */
export interface UpdatePaymentProfileResponse extends PaymentPreferencesInterface{
}


/* **************** Notification Interfaces *************** */
export interface UpdateNotificationProfileResponse extends NotificationPreferencesInterface{
}

/* **************** Chat Interfaces *************** */
export interface UpdateChatProfileResponse extends ChatPreferencesInterface{
}