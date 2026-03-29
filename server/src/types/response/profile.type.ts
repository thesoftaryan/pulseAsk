import { AnswerInterface } from "../../models/Answer.model";
import { QuestionInterface } from "../../models/Question.model";
import { UserInterface } from "../../models/User.model";

export interface FetchProfileResponse{
    user:Partial<UserInterface>;
    questions: QuestionInterface[],
    answers: AnswerInterface[],
}

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