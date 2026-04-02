import type { TagInterface } from "./tag.type";

// export interface User{
//     uid : string;
//     email : string;
//     firstName : string;
//     lastName : string;
//     profile?:string;
// }

export interface UserResponse{
    user: Partial<UserInterface>;
};


interface StripeConnection{
    id : string;
    userId: string;
    stripeAccountId : string;
    payoutsEnabled: boolean;
    chargesEnabled: boolean;
    stripeOnboardingUrl?: boolean | null;
    connectedAt: string;
    lastSyncedAt?: string | null;    
}

interface PaypalConnection{
    id : string;
    userId : string;
    paypalMerchantId : string;
    connectionStatus : 'pending' | 'connected' | 'disconnected' | 'failed';
    accessTokenExpiresAt? : string;
    refreshTokenEncrypted? : string | null;
    onboardingUrl? : string | null;
    connectedAt? : string | null;
    lastSyncedAt? : string | null;
}


interface PaymentAccountsInterface{
    // userId : Schema.Types.ObjectId;
    // upiName : string;
    // upiId : string;
    stripeAccount? : StripeConnection | null;
    paypalAccount? : PaypalConnection | null;
}

export interface NotificationPreferencesInterface{
    answer:boolean;
    chat:boolean;
    payment:boolean;
    announcement:boolean;
    promotional:boolean;
}

export interface PaymentPreferencesInterface{
    enablePayment: boolean;
}

export interface ChatPreferencesInterface{
    enableChat: boolean;
}


export interface UserInterface{
    _id: string,
    // ********** Profile Information ************ //
    profile : string;
    createdAt : Date;

    userName: string;

    firstName : string;
    lastName : string;
    email : string;
    password : string;
    isVerified : boolean;
    
    // *********** Reset Password ******************** //
    resetPasswordToken : string;
    resetPasswordExpires : Date;
    
    // *********** Security ******************** //
    emailVerified : boolean;
    emailVerificationToken : string;
    emailVerificationExpires : Date;
    
    // *********** Auth Provider *************** //
    authProvider : string;
    providerId : string;
    
    //************* Social Information ********** //
    degree : string;
    college : string;
    descriptionHTML? : string;
    descriptionJSON?: string;
    tags : TagInterface[];
    instagram : string;
    facebook : string;
    linkedin : string;
    youtube : string;

    //************* Stats Information ********** //
    questionsAsked: number;
    answersGiven: number;
    upvotes: number;
    downvotes: number;
    reputationScore: number;
    
    //************* Payment Information ********** //
    paymentAccounts : PaymentAccountsInterface;

    //************* Preferences Information ********** //
    paymentPreferences: PaymentPreferencesInterface,
    notificationPreferences: NotificationPreferencesInterface;
    chatPreferences: ChatPreferencesInterface,
}