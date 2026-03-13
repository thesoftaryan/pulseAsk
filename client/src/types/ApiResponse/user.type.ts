import type { TagResponseData } from "./index.type";

// export interface User{
//     uid : string;
//     email : string;
//     firstName : string;
//     lastName : string;
//     profile?:string;
// }


interface StripeConnection{
    id : string;
    userId: string;
    stripeAccountId : string;
    payoutsEnabled: Boolean;
    chargesEnabled: Boolean;
    stripeOnboardingUrl?: Boolean | null;
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

interface NotificationPreferencesInterface{
    answer:Boolean;
    chat:Boolean;
    payment:Boolean;
    announcement:Boolean;
    promotional:Boolean;
}



export interface UserInterface{
    _id: string,
    // ********** Profile Information ************ //
    profile : string;
    createdAt : Date;

    firstName : string;
    lastName : string;
    email : string;
    password : string;
    isVerified : Boolean;
    
    // *********** Reset Password ******************** //
    resetPasswordToken : string;
    resetPasswordExpires : Date;
    
    // *********** Security ******************** //
    emailVerified : Boolean;
    emailVerificationToken : string;
    emailVerificationExpires : Date;
    
    // *********** Auth Provider *************** //
    authProvider : string;
    providerId : string;
    
    //************* Social Information ********** //
    degree : string;
    college : string;
    description : string;
    tags : TagResponseData[];
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
    enablePayment: Boolean;
    paymentAccounts : PaymentAccountsInterface;

    //************* Preferences Information ********** //
    notificationPreferences: NotificationPreferencesInterface;
    enableChat: Boolean;
}