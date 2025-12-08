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


export interface PaymentModel extends Document{
    userId : Schema.Types.ObjectId;
    upiName : string;
    upiId : string;
    stripeAccount? : StripeConnection | null;
    paypalAccount? : PaypalConnection | null;
}