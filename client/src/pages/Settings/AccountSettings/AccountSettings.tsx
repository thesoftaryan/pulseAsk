import AccountSettingsStyle from "./AccountSettings.module.css";
import { SettingsActionButton } from "./SettingsActionButton/SettingsActionButton";

import ChangeIcon from "../../../assets/icons/general/change.svg?react";
import SaveIcon from "../../../assets/icons/general/save.svg?react";
import DeleteIcon from "../../../assets/icons/general/delete.svg?react";
import passwordIcon from "../../../assets/icons/general/password.svg?react";
import InstagramIcon from "../../../assets/icons/profile/instagram.svg?react";
import FacebookIcon from "../../../assets/icons/profile/facebook.svg?react";
import LinkedinIcon from "../../../assets/icons/profile/linkedin.svg?react";
import YoutubeIcon from "../../../assets/icons/profile/youtube.svg?react";

import Divider from "../../../components/common/Divider/Divider";
import { color } from "../../../theme/ThemeVariables";
import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import InputField from "../../../components/common/InputField/InputField";
import { useAppSelector } from "../../../hooks/store.hook";
import TextEditor from "../../../components/common/TextEditor/TextEditor";
import Button from "../../../components/common/Button/Button";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { authRoutes } from "../../../routes/routesConstants";
import { useEffect, useState } from "react";
import { useAccountSettingsHandler } from "./AccountSettings.handler";
import InlineError from "../../../components/common/InlineError/InlineError";
import { TagChip } from "../../../components/common/TagChip/TagChip";
import type { TagInterface } from "../../../types/ApiResponse/tag.type";

interface BasicProfileProps{
    userName: string;
    firstName: string;
    lastName: string;
    degree: string;
    college:string;
    descriptionHTML: string;
    descriptionJSON: string;
    descriptionContent?: string;
}
interface SocialProfileProps{
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
}

export const AccountSettings = ()=>{
    const {safeNavigate} = useSafeNavigate();
    const user = useAppSelector(state=>state.auth.user);

    let initBasicProfile:BasicProfileProps={
        userName: user?.userName??"",
        firstName: user?.firstName??"",
        lastName: user?.lastName??"",
        degree: user?.degree??"",
        college: user?.college??"",
        descriptionHTML: user?.descriptionHTML??"",
        descriptionJSON: user?.descriptionJSON??"",
    }

    let initSocialProfile:SocialProfileProps = {
        instagram: user?.instagram??"",
        facebook: user?.facebook??"",
        linkedin: user?.linkedin??"",
        youtube: user?.youtube??"",
    }

    const updateProfileObjects = ()=>{
        initBasicProfile = {
            userName: user?.userName??"",
            firstName: user?.firstName??"",
            lastName: user?.lastName??"",
            degree: user?.degree??"",
            college: user?.college??"",
            descriptionHTML: user?.descriptionHTML??"",
            descriptionJSON: user?.descriptionJSON??"",
        }
        initSocialProfile = {
            instagram: user?.instagram??"",
            facebook: user?.facebook??"",
            linkedin: user?.linkedin??"",
            youtube: user?.youtube??"",
        }
    }

    useEffect(()=>{
        updateProfileObjects();
        setBasicProfile(initBasicProfile);
        setSocialProfile(initSocialProfile);
    }, [user]);

    const [basicProfile, setBasicProfile] = useState<BasicProfileProps>(initBasicProfile);
    const [socialProfile, setSocialProfile] = useState<SocialProfileProps>(initSocialProfile);

    const [kTagState, setKTagState] = useState<{adding:boolean, removing:boolean}>({adding:false, removing:false});
    const [kTags, setKTags] = useState<TagInterface[]>([]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const {UpdateBasicProfileHandler, updateSocialProfileHandler, addKTagHandler, removeKTagHandler} = useAccountSettingsHandler(setBasicProfile, setSocialProfile, setKTags, setErrors);



    const handleRemoveKTag = (kTid: string)=>{
        removeKTagHandler(setKTagState);
    }

    const handleAddKTag = (kTid: string)=>{
        addKTagHandler(setKTagState);
    }


    return (
        <div className={AccountSettingsStyle["container"]}>
            <Divider text="Set your profile details"/>
            <div className={AccountSettingsStyle["profile-details"]}>
                <div className={AccountSettingsStyle["user-profile-settings"]}>
                    <UserProfile className={AccountSettingsStyle["user-profile"]}/>
                    <div className={AccountSettingsStyle["user-profile-actions"]}>
                        <DeleteIcon className={AccountSettingsStyle["icon"]}/>
                        <ChangeIcon className={AccountSettingsStyle["icon"]}/>
                    </div>
                </div>
                <div className={AccountSettingsStyle["user-details-settings"]}>
                    <div className={AccountSettingsStyle["user-userName"]}>
                        <div className={AccountSettingsStyle["label"]}>User Name</div>
                        <InputField placeholder="Change your user name" onChange={(e)=>{ setErrors({}); setBasicProfile({...basicProfile, userName:e.target.value})}} value={basicProfile?.userName}/>
                        {errors.userName && <InlineError message={errors.userName}/>}
                    </div>
                    <div className={AccountSettingsStyle["user-name"]}>
                        <div className={AccountSettingsStyle["first-name"]}>
                            <div className={AccountSettingsStyle["label"]}>First Name</div>
                            <InputField placeholder="Enter your first name" onChange={(e)=>{ setErrors({}); setBasicProfile({...basicProfile, firstName:e.target.value})}} value={basicProfile?.firstName}/>
                            {errors.firstName && <InlineError message={errors.firstName}/>}
                        </div>
                        <div className={AccountSettingsStyle["last-name"]}>
                            <div className={AccountSettingsStyle["label"]}>Last Name</div>
                            <InputField placeholder="Enter your last name" onChange={(e)=>{ setErrors({}); setBasicProfile({...basicProfile, lastName:e.target.value})}} value={basicProfile?.lastName}/>
                            {errors.lastName && <InlineError message={errors.lastName}/>}
                        </div>
                    </div>
                    <div className={AccountSettingsStyle["user-email"]}>
                        <div className={AccountSettingsStyle["label"]}>Email</div>
                        <InputField placeholder="" onChange={()=>{}} value={user?.email} disabled={true}/>
                    </div>
                    <div className={AccountSettingsStyle["label"]}>Education</div>
                    <div className={AccountSettingsStyle["user-education"]}>
                        <div className={AccountSettingsStyle["user-degree"]}>
                            <div className={AccountSettingsStyle["label"]}>Degree</div>
                            <InputField placeholder="Enter your degree, e.g. MBBS, MD" onChange={(e)=>{ setErrors({}); setBasicProfile({...basicProfile, degree:e.target.value})}} value={basicProfile?.degree}/>
                            {errors.degree && <InlineError message={errors.degree}/>}
                        </div>
                        <div className={AccountSettingsStyle["user-college"]}>
                            <div className={AccountSettingsStyle["label"]}>College</div>
                            <InputField placeholder="Enter your college name" onChange={(e)=>{ setErrors({}); setBasicProfile({...basicProfile, college:e.target.value})}} value={basicProfile?.college}/>
                            {errors.college && <InlineError message={errors.college}/>}
                        </div>
                    </div>
                    
                    <div className={AccountSettingsStyle["user-description"]}>
                        <div className={AccountSettingsStyle["label"]}>Description</div>
                        <TextEditor placeholder="Write here what you want others to know about you!!" onChange={(e)=>{ setErrors({}); setBasicProfile({...basicProfile, descriptionContent:e.text, descriptionHTML:e.html, descriptionJSON:String(e.json)})}}/>
                        {errors.description && <InlineError message={errors.description}/>}
                    </div>

                    <div className={AccountSettingsStyle["save-button"]}>
                        <SettingsActionButton onClick={()=>{UpdateBasicProfileHandler(basicProfile)}} text="Save Details" Icon={SaveIcon}/>
                    </div>
                </div>
            </div>
            <Divider text="Set your social links"/>
            <div className={AccountSettingsStyle["social-links"]}>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <InstagramIcon className={AccountSettingsStyle["icon"]}/>
                    <p style={{margin: 10,}}>@</p>
                    <InputField placeholder="Instagram username" onChange={(e)=>{ setErrors({}); setSocialProfile({...socialProfile, instagram: e.target.value})}} value={socialProfile?.instagram}/>
                    {errors.instagram && <InlineError message={errors.instagram}/>}
                </div>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <FacebookIcon className={AccountSettingsStyle["icon"]}/>
                    <p style={{margin: 10,}}>@</p>
                    <InputField placeholder="Facebook username" onChange={(e)=>{ setErrors({}); setSocialProfile({...socialProfile, facebook: e.target.value})}} value={socialProfile?.facebook}/>
                    {errors.facebook && <InlineError message={errors.facebook}/>}
                </div>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <LinkedinIcon className={AccountSettingsStyle["icon"]}/>
                    <p style={{margin: 10,}}>@</p>
                    <InputField placeholder="Linkedin username" onChange={(e)=>{ setErrors({}); setSocialProfile({...socialProfile, linkedin: e.target.value})}} value={socialProfile?.linkedin}/>
                    {errors.linkedin && <InlineError message={errors.linkedin}/>}
                </div>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <YoutubeIcon className={AccountSettingsStyle["icon"]}/>
                    <p style={{margin: 10,}}>@</p>
                    <InputField placeholder="Youtube Channel username" onChange={(e)=>{ setErrors({}); setSocialProfile({...socialProfile, youtube: e.target.value})}} value={socialProfile?.youtube}/>
                    {errors.youtube && <InlineError message={errors.youtube}/>}
                </div>
            </div>
            <div className={AccountSettingsStyle["save-button"]}>
                <SettingsActionButton onClick={()=>{updateSocialProfileHandler(socialProfile);}} text="Save Details" Icon={SaveIcon}/>
            </div>
            <Divider text="Set your knowledge tags"/>
            <div className={AccountSettingsStyle["knowledge-tags"]}>
                {/* <div className={AccountSettingsStyle["tag-input-label"]}>Add Tags</div>
                <div className={AccountSettingsStyle["tag-input"]}>
                    <InputField placeholder="Add new knowledge tag"/>
                </div> */}
                <div className={AccountSettingsStyle["knowledge-tag-input-container"]}>
                    <input type="text" placeholder="Enter your tag" className={AccountSettingsStyle["knowledge-tag-input"]}/>
                    <div className={AccountSettingsStyle["add-knowledge-tag-button"]}>
                        <Button text="Add Tag" level2={true} isSmall={true}/>
                    </div>
                </div>
                <div className={AccountSettingsStyle["knowledge-tags-container"]}>
                    
                    {
                        !kTags.length
                        && 
                        <p className={AccountSettingsStyle["label"]}> Add knowledge tags to tell people in which field you have knowledge <small>e.g. Heart</small></p>
                    }
                    {
                        kTags.map((tag)=>{
                            return <TagChip key={tag._id} onDelete={()=>{}} text={tag.name} color={tag.color}/>
                        })
                    }

                </div>
            </div>
            <Divider text="Danger Zone" color={color.colorDanger}/>
            <div className={AccountSettingsStyle["danger-zone"]}>
                <SettingsActionButton text="Delete Account" Icon={DeleteIcon} color={color.colorDanger}/>
                <SettingsActionButton onClick={()=>{safeNavigate(authRoutes.forgotPassword)}} text="Change Password" Icon={passwordIcon} color={color.colorOrange}/>
            </div>
        </div>
    );
}