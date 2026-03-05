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
import { TagChip } from "../../../components/common/TagChip/TagChip";
import Button from "../../../components/common/Button/Button";

export const AccountSettings = ()=>{
    const user = useAppSelector(state=>state.auth.user);
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
                    <div className={AccountSettingsStyle["user-name"]}>
                        <InputField placeholder="" value={user?.first_name}/>
                        <InputField placeholder="" value={user?.last_name}/>
                    </div>
                    <InputField placeholder="" value={user?.email} disabled={true}/>
                    <div className={AccountSettingsStyle["user-education"]}>
                        <InputField placeholder="" value="B.Tech"/>
                        <InputField placeholder="" value="IIT Bhilai"/>
                    </div>
                    
                    <TextEditor onChange={()=>{}}/>

                    <div className={AccountSettingsStyle["center-button"]}>
                        <SettingsActionButton text="Save Details" Icon={SaveIcon}/>
                    </div>
                </div>
            </div>
            <Divider text="Set your social links"/>
            <div className={AccountSettingsStyle["social-links"]}>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <InstagramIcon className={AccountSettingsStyle["icon"]}/>
                    <InputField placeholder="Instagram Profile Link"/>
                </div>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <FacebookIcon className={AccountSettingsStyle["icon"]}/>
                    <InputField placeholder="Facebook Profile Link"/>
                </div>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <LinkedinIcon className={AccountSettingsStyle["icon"]}/>
                    <InputField placeholder="Linkedin Profile Link"/>
                </div>
                <div className={AccountSettingsStyle["social-links-group"]}>
                    <YoutubeIcon className={AccountSettingsStyle["icon"]}/>
                    <InputField placeholder="Youtube Channel Link"/>
                </div>
            </div>
            <Divider text="Set your knowledge tags"/>
            <div className={AccountSettingsStyle["knowledge-tags"]}>
                {/* <div className={AccountSettingsStyle["tag-input-label"]}>Add Tags</div>
                <div className={AccountSettingsStyle["tag-input"]}>
                    <InputField placeholder="Add new knowledge tag"/>
                </div> */}
                <div className={AccountSettingsStyle["knowledge-tag-input-container"]}>
                    <input type="text" placeholder="Enter your tag" className={AccountSettingsStyle["knowledge-tag-input"]}/>
                    <div className={AccountSettingsStyle["add-knowledge-tag"]}>
                        <Button text="Add Tag" level2={true} isSmall={true}/>
                    </div>
                </div>
                <div className={AccountSettingsStyle["tags-container"]}>
                    <TagChip text="Neuro" color="purple" level1={true}/>
                    <TagChip text="Neuro" color="purple" level1={true}/>
                    <TagChip text="Neuro" color="purple" level1={true}/>
                    <TagChip text="Neuro" color="purple" level1={true}/>
                </div>
            </div>
            <Divider text="Danger Zone" color={color.colorDanger}/>
            <div className={AccountSettingsStyle["danger-zone"]}>
                <SettingsActionButton text="Delete Account" Icon={DeleteIcon} color={color.colorDanger}/>
                <SettingsActionButton text="Change Password" Icon={passwordIcon} color={color.colorOrange}/>
            </div>
        </div>
    );
}