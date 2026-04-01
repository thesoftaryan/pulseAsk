import type { TagInterface } from "./tag.type";

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
export interface UpdatePaymentProfileResponse{
    enablePayments: boolean;
}


/* **************** Notification Interfaces *************** */
export interface UpdateNotificationProfileResponse{
    answer: boolean;
    chat: boolean;
    payment: boolean;
    announcement: boolean;
    promotional: boolean;
}

/* **************** Chat Interfaces *************** */
export interface UpdateChatProfileResponse{
    enableChat: boolean;
}