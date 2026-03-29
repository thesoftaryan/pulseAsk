/* **************** Account Interfaces *************** */
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