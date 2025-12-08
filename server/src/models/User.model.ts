import {Schema, model, Document} from "mongoose";

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

export interface UserModel extends Document{
    // ********** Profile Information ************ //
    firstName : string;
    lastName : string;
    email : string;
    password : string;

    //************* Social Information **********/
    educationDegree : string;
    college : string;
    profileDescription : string;
    instagramLink : string;
    facebookLink : string;
    linkedinLink : string;
    youtubeLink : string;
    tags : Schema.Types.ObjectId[];
}

// Need to create schema and model