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
    kTid: string;
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