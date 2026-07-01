import { Types } from "mongoose";
import { STATUS } from "../constants/statusCodes.constants";
import { User } from "../models/User.model";
import { ApiError } from "../utils/error.util";
import { AddKTagResponse, RemoveKTagResponse, UpdateBasicProfileResponse, UpdateChatProfileResponse, UpdateNotificationProfileResponse, UpdatePaymentProfileResponse, UpdateSocialProfileResponse, UpdateUserProfileImageResponse } from "../types/response/settings.type";
import { AddKTagPayload, RemoveKTagPayload, UpdateBasicProfilePayload, UpdateChatProfilePayload, UpdateNotificationProfilePayload, UpdatePaymentProfilePayload, UpdateSocialProfilePayload, UpdateUserProfileImagePayload } from "../types/settings.type";
import { slugifyText } from "../utils/general.util";
import { Tag } from "../models/Tag.model";
import { generateTagColor } from "../utils/tag.util";

import {accountConstants} from "../constants/settings.constants";
import { createTagService } from "./tag.service";



/* **************** Account Settings Services *************** */


/**
 * @param data of type UpdateBasicProfilePayload
 * @returns updated data of type UpdateBasicProfileResponse
 */
export const updateBasicProfileService = async (uid:Types.ObjectId ,data : UpdateBasicProfilePayload):Promise<UpdateBasicProfileResponse>=>{
    const duplicate = await User.findOne({userName: data.userName});
    if(duplicate && (duplicate._id != uid)){
        // !== won't work because type of _id is object and type of uid is string
        // console.log(typeof(duplicate._id), ", ", typeof(uid));
        throw new ApiError(
            STATUS.CLIENT_ERROR.CONFLICT,
            "Username already taken",
        );
    }
    
    await User.updateOne({_id:uid}, data);
    // const user = await User.findById(uid);
    // const updatedDetails = {
    //     userName: user!.userName,
    //     firstName: user!.firstName,
    //     lastName: user!.lastName,
    //     degree: user!.degree??"",
    //     college: user!.college??"",
    //     descriptionHTML: user!.descriptionHTML??"",
    //     descriptionJSON: user!.descriptionJSON??"",
    // };
    return data;
}

/**
 * @param data of type UpdateSocialProfilePayload
 * @returns updated data of type UpdateSocialProfileResponse
 */
export const updateSocialProfileService = async (uid:Types.ObjectId, data : UpdateSocialProfilePayload):Promise<UpdateSocialProfileResponse>=>{
    await User.updateOne({_id: uid}, data);
    return data;
}

/**
 * @param data of type AddKTagPayload
 * @returns data of type AddKTagResponse
 */
export const addKTagService = async (uid: Types.ObjectId, data : AddKTagPayload) : Promise<AddKTagResponse>=>{
    const slug = slugifyText(data.name);

    const user = await User.findById(uid);
    if(user?.tags.length && (user?.tags.length >= accountConstants.maxAllowedKTags)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.FORBIDDEN,
            `At most ${accountConstants.maxAllowedKTags} tags allowed`,
        );
    }

    const tag = await Tag.findOne({slug});
    if(tag){
        let duplicate = false;
        // console.log(user?.tags);
        for(const curr of user?.tags??[]){
            if(curr._id.toString() === tag._id.toString()){
                // console.log("found duplicate: ", curr);
                duplicate=true;break;
            }
        }
        if(duplicate){
            throw new ApiError(
                STATUS.CLIENT_ERROR.CONFLICT,
                "Tag already added",
            );
        }
        user?.tags.push(tag);
        await user?.save();
        return tag;
    }
    const newTagArray = await createTagService([{name: data.name}]);
    
    const newTag = await Tag.findById(newTagArray[0]);
    
    user?.tags.push(newTag!);
    
    await user?.save();

    return newTag!;
}

/**
 * @param data of type RemoveKTagPayload
 * @returns data of type RemoveKTagResponse
 */
export const removeKTagService = async (uid: Types.ObjectId, data : RemoveKTagPayload) : Promise<RemoveKTagResponse>=>{
    if(!Types.ObjectId.isValid(data.kTid)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Tag not found",
        );
    }

    const user = await User.findById(uid);

    let tags = user!.tags;

    tags = tags.filter((tag)=>{
        if(tag._id != data.kTid) return tag;
    });

    user!.tags = tags;

    await user?.save();

    return {};
}

/**
 * @param data of Type UpdateUserProfileImagePayload
 * @returns data of Type UpdateUserProfileImageResponse
 */
export const updateUserProfileImageService = async (uid:Types.ObjectId, data : UpdateUserProfileImagePayload) : Promise<UpdateUserProfileImageResponse>=>{
    const {imageUrl} = data;
    const user = await User.findById(uid);

    user!.profile = imageUrl;
    await user?.save();

    return {};
}

/**
 * @param uid userId
 * @returns nothing
 */
export const removeUserProfileImageService = async (uid:Types.ObjectId)=>{
    const user = await User.findById(uid);
    user!.profile = undefined;
    user?.save();
    return;
}


/* **************** Payment Settings Services *************** */
/**
 * @param data of type UpdatePaymentProfilePayload
 * @returns updated object of type UpdatePaymentProfileResponse
 */
export const updatePaymentProfileService = async (uid:Types.ObjectId, data : UpdatePaymentProfilePayload):Promise<UpdatePaymentProfileResponse>=>{
    const user = await User.findById(uid);
    user!.paymentPreferences = data;
    await user!.save();
    return user!.paymentPreferences;
}

/* **************** Notification Settings Services *************** */
/**
 * @param data of type UpdateNotificationProfilePayload
 * @returns updated object of type UpdateNotificationProfileResponse
 */
export const updateNotificationProfileService = async (uid:Types.ObjectId, data : UpdateNotificationProfilePayload):Promise<UpdateNotificationProfileResponse>=>{
    const user = await User.findById(uid);
    user!.notificationPreferences = data;
    await user!.save();
    return user!.notificationPreferences;
}

/* **************** Chat Settings Services *************** */
/**
 * @param data of type UpdateChatProfilePayload
 * @returns updated object of type UpdateChatProfileResponse
 */
export const updateChatProfileService = async (uid:Types.ObjectId, data : UpdateChatProfilePayload):Promise<UpdateChatProfileResponse>=>{
    const user = await User.findById(uid);
    user!.chatPreferences = data;
    await user!.save();
    return user!.chatPreferences;
}