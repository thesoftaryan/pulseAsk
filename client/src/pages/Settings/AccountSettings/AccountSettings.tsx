import AccountSettingsStyle from "./AccountSettings.module.css";
import { SettingsActionButton } from "./SettingsActionButton/SettingsActionButton";

import ChangeIcon from "../../../assets/icons/general/change.svg?react";
import SaveIcon from "../../../assets/icons/general/save.svg?react";
import DeleteIcon from "../../../assets/icons/general/delete.svg?react";
import passwordIcon from "../../../assets/icons/general/password.svg?react";
import Divider from "../../../components/common/Divider/Divider";
import { color } from "../../../theme/ThemeVariables";
import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import InputField from "../../../components/common/InputField/InputField";
import { useAppSelector } from "../../../hooks/store.hook";
import TextEditor from "../../../components/common/TextEditor/TextEditor";

export const AccountSettings = ()=>{
    const user = useAppSelector(state=>state.auth.user);
    return (
        <div className="container">
            <div className="profile-details">
                <Divider text="Set your profile details"/>
                <div className="user-profile-settings">
                    <UserProfile/>
                    <div className="user-profile-actions">
                        <DeleteIcon/>
                        <ChangeIcon/>
                    </div>
                </div>
                <div className="user-details-settings">
                    <div className="user-name">
                        <InputField placeholder="" value={user?.first_name}/>
                        <InputField placeholder="" value={user?.last_name}/>
                    </div>
                    <InputField placeholder="" value={user?.email} disabled={true}/>
                    <div className="user-education">
                        <InputField placeholder="" value="B.Tech"/>
                        <InputField placeholder="" value="IIT Bhilai"/>
                    </div>
                    
                    <TextEditor onChange={()=>{}}/>

                    <SettingsActionButton text="Save Details" Icon={SaveIcon}/>
                </div>
            </div>
            <div className="social-links">
                <Divider text="Set your social links"/>
            </div>
            <div className="knowledge-tags">
                <Divider text="Set your knowledge tags"/>
            </div>
            <div className="danger-zone">
                <Divider text="Danger Zone" color={color.colorDanger}/>
                <SettingsActionButton text="Delete Account" Icon={DeleteIcon} color={color.colorDanger}/>
                <SettingsActionButton text="Change Password" Icon={passwordIcon} color={color.colorOrange}/>
            </div>
        </div>
    );
}