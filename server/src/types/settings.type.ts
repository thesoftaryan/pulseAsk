import { Types } from "mongoose";
import { PaymentPreferencesInterface, NotificationPreferencesInterface, ChatPreferencesInterface } from "../models/User.model";

/* **************** Account Interfaces *************** */
export interface UpdateUserProfileImagePayload{
    imageUrl : string;
}

export interface UpdateBasicProfilePayload{
    userName: string;
    firstName: string;
    lastName: string;
    degree: string;
    college:string;
    descriptionHTML: string;
    descriptionJSON: string;
}

export interface UpdateSocialProfilePayload{
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
}

export interface AddKTagPayload{
    name: string;
}

export interface RemoveKTagPayload{
    kTid: Types.ObjectId;
}


/* **************** Payment Interfaces *************** */
export interface UpdatePaymentProfilePayload extends PaymentPreferencesInterface{
}


/* **************** Notification Interfaces *************** */
export interface UpdateNotificationProfilePayload extends NotificationPreferencesInterface{
}

/* **************** Chat Interfaces *************** */
export interface UpdateChatProfilePayload extends ChatPreferencesInterface{
}