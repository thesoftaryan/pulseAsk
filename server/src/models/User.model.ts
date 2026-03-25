import {Schema, model, Document, Types} from "mongoose";
import { TagInterface } from "./Tag.model";

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



export interface UserInterface extends Document{
    _id: Types.ObjectId,
    // ********** Profile Information ************ //
    profile? : string;
    createdAt : Date;

    firstName : string;
    lastName : string;
    email : string;
    password : string;
    isVerified : Boolean;
    
    // *********** Reset Password ******************** //
    resetPasswordToken? : string;
    resetPasswordExpires? : Date;
    
    // *********** Security ******************** //
    emailVerified : Boolean;
    emailVerificationToken? : string;
    emailVerificationExpires? : Date;
    
    // *********** Auth Provider *************** //
    authProvider : string;
    providerId : string;
    
    //************* Social Information ********** //
    degree? : string;
    college? : string;
    description? : string;
    tags : TagInterface[];
    instagram? : string;
    facebook? : string;
    linkedin? : string;
    youtube? : string;

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


const stripeConnectionSchema = new Schema(
{
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    stripeAccountId: {
        type: String,
        required: true
    },
    payoutsEnabled: {
        type: Boolean,
        default: false
    },
    chargesEnabled: {
        type: Boolean,
        default: false
    },
    stripeOnboardingUrl: {
        type: String,
        default: null
    },
    connectedAt: {
        type: String
    },
    lastSyncedAt: {
        type: String,
        default: null
    }
},
{ _id: false, },
);

const paypalConnectionSchema = new Schema(
{
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    paypalMerchantId: {
        type: String,
        required: true
    },
    connectionStatus: {
        type: String,
        enum: ['pending', 'connected', 'disconnected', 'failed'],
        default: 'pending'
    },
    accessTokenExpiresAt: {
        type: String
    },
    refreshTokenEncrypted: {
        type: String,
        default: null
    },
    onboardingUrl: {
        type: String,
        default: null
    },
    connectedAt: {
        type: String,
        default: null
    },
    lastSyncedAt: {
        type: String,
        default: null
    }
},
{ _id: false, },
);

const paymentAccountsSchema = new Schema(
{
    stripeAccount: {
        type: stripeConnectionSchema,
        default: null
    },
    paypalAccount: {
        type: paypalConnectionSchema,
        default: null
    }
},
{ _id: false, },
);

const notificationPreferencesSchema = new Schema(
{
    answer: {
        type: Boolean,
        default: true
    },
    chat: {
        type: Boolean,
        default: true
    },
    payment: {
        type: Boolean,
        default: true
    },
    announcement: {
        type: Boolean,
        default: true
    },
    promotional: {
        type: Boolean,
        default: false
    }
},
{ _id: false, },
);


const userSchema = new Schema<UserInterface>(
    {
        // ********** Profile Information ************ //
        profile : {
            type: String,
            required: false,
        },
        firstName : {
            type: String, 
            required: true, 
            trim: true
        },
        lastName : {
            type : String,
            required: false, 
            trim: true
        },
        email : {
            type: String,
            required: true, 
            trim: true, 
            unique: true, 
            lowercase: true
        },
        password : {
            type: String, 
            required: false, 
            select : false,
        },
        isVerified : {
            type: Boolean, 
            default: false
        },

        // *********** Reset Password ******************** //
        resetPasswordToken : {
            type: String
        },
        resetPasswordExpires : {
            type: Date
        },

        // *********** Security ******************** //
        emailVerified : {
            type: Boolean,
            default: false
        },
        emailVerificationToken : {
            type: String,
        },
        emailVerificationExpires : {
            type: Date,
        },

        // *********** Auth Provider *************** //
        authProvider : {
            type : String,
            enum : ["local", "google"],
            default : "local",
        },
        providerId : {
            type : String,
        },
        //************* Social Information ********** //
        degree : {
            type : String,
        },
        college : {
            type : String,
        },
        description : {
            type : String,
        },
        tags : [
            {
                type: Schema.Types.ObjectId,
            }
        ],
        instagram : {
            type : String,
        },
        facebook : {
            type : String,
        },
        linkedin : {
            type : String,
        },
        youtube : {
            type : String,
        },

        //************* Stats Information ********** //
        questionsAsked: {
            type : Number,
            default:0,
        },
        answersGiven: {
            type : Number,
            default:0,
        },
        upvotes: {
            type : Number,
            default:0,
        },
        downvotes: {
            type : Number,
            default:0,
        },
        reputationScore: {
            type : Number,
            default:0,
        },
        
        //************* Payment Information ********** //
        enablePayment: {
            type : Boolean,
            default: false,
        },
        paymentAccounts : {
            type: paymentAccountsSchema,
            select : false,
        },

        //************* Preferences Information ********** //
        notificationPreferences: {
            type: notificationPreferencesSchema
        },
        enableChat: {
            type: Boolean,
            default: true,
        },
    },
    {timestamps:true,}
);

export const User = model<UserInterface>("User", userSchema);