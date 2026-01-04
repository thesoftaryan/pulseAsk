import {Schema, model, Document, Types} from "mongoose";


export interface IUser extends Document{
    // ********** Profile Information ************ //
    _id: Types.ObjectId;
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    isVerified : boolean;
    createdAt : Date;

    // *********** Auth Provider *************** //
    authProvider : String;

    //************* Social Information ********** //
    // educationDegree : string;
    // college : string;
    // profileDescription : string;
    // instagramLink : string;
    // facebookLink : string;
    // linkedinLink : string;
    // youtubeLink : string;
    // tags : Schema.Types.ObjectId[];
}


const userSchema = new Schema<IUser>(
    {
        // ********** Profile Information ************ //
        firstName : {
            type: String, 
            required: true, 
            trim: true
        },
        lastName : {
            type : String,
            required: true, 
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

        // *********** Auth Provider *************** //
        authProvider : {
            type : String,
            enum : ["local", "google"],
            default : "local",
        },
    },
    {timestamps:true,}
);

export const User = model<IUser>("User", userSchema);