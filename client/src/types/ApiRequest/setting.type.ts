/* **************** Account Interfaces *************** */

import type { PaymentPreferencesInterface, NotificationPreferencesInterface, ChatPreferencesInterface } from "../ApiResponse/user.type";

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
    kTid: string;
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