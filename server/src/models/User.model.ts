import {Schema, model, Document, Types} from "mongoose";
import { TagInterface } from "./Tag.model";

interface StripeConnection{
    id : String;
    userId: String;
    stripeAccountId : String;
    payoutsEnabled: Boolean;
    chargesEnabled: Boolean;
    stripeOnboardingUrl?: Boolean | null;
    connectedAt: String;
    lastSyncedAt?: String | null;    
}

interface PaypalConnection{
    id : String;
    userId : String;
    paypalMerchantId : String;
    connectionStatus : 'pending' | 'connected' | 'disconnected' | 'failed';
    accessTokenExpiresAt? : String;
    refreshTokenEncrypted? : String | null;
    onboardingUrl? : String | null;
    connectedAt? : String | null;
    lastSyncedAt? : String | null;
}


interface PaymentAccountsInterface{
    // userId : Schema.Types.ObjectId;
    // upiName : String;
    // upiId : String;
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
    // ********** Profile Information ************ //
    profile? : String;
    createdAt : Date;

    firstName : String;
    lastName : String;
    email : String;
    password : String;
    isVerified : Boolean;
    
    // *********** Reset Password ******************** //
    resetPasswordToken? : String;
    resetPasswordExpires? : Date;
    
    // *********** Security ******************** //
    emailVerified : Boolean;
    emailVerificationToken? : String;
    emailVerificationExpires? : Date;
    
    // *********** Auth Provider *************** //
    authProvider : String;
    providerId : String;
    
    //************* Social Information ********** //
    degree? : String;
    college? : String;
    description? : String;
    tags : TagInterface[];
    instagram? : String;
    facebook? : String;
    linkedin? : String;
    youtube? : String;

    //************* Stats Information ********** //
    questionsAsked: Number;
    answersGiven: Number;
    upvotes: Number;
    downvotes: Number;
    reputationScore: Number;
    
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
{ _id: false }
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
{ _id: false }
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
{ _id: false }
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
{ _id: false }
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
            select : false
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
        },
        answersGiven: {
            type : Number,
        },
        upvotes: {
            type : Number,
        },
        downvotes: {
            type : Number,
        },
        reputationScore: {
            type : Number,
        },
        
        //************* Payment Information ********** //
        enablePayment: {
            type : Boolean,
        },
        paymentAccounts : {
            type: paymentAccountsSchema
        },

        //************* Preferences Information ********** //
        notificationPreferences: {
            type: notificationPreferencesSchema
        },
        enableChat: {
            type: Boolean,
        },
    },
    {timestamps:true,}
);

export const User = model<UserInterface>("User", userSchema);