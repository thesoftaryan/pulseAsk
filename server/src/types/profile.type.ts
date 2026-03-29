// import { Types } from "mongoose";

// export interface Person{
//     _id: Types.ObjectId;
//     profile?: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     //************* Social Information ********** //
//     college? : string;
//     //************* Stats Information ********** //
//     reputationScore: number;
// }

export interface FetchProfilePayload{
    userName: string;
}

/* **************** Account Interfaces *************** */
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


/* **************** Payment Interfaces *************** */
export interface UpdatePaymentProfilePayload{
    enablePayments: boolean;
}


/* **************** Notification Interfaces *************** */
export interface UpdateNotificationProfilePayload{
    answer: boolean;
    chat: boolean;
    payment: boolean;
    announcement: boolean;
    promotional: boolean;
}

/* **************** Chat Interfaces *************** */
export interface UpdateChatProfilePayload{
    enableChat: boolean;
}