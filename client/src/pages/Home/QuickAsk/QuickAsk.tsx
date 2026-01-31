import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import QuickAskStyles from "./QuickAsk.module.css"

export const QuickAsk = ()=>{
    return (
        <>
            <div className={QuickAskStyles["container"]}>
                <div className={QuickAskStyles["ask-box"]}>
                    <div className={QuickAskStyles["profile-icon"]}>
                        <UserProfile/>
                    </div>
                    <div className={QuickAskStyles["text"]}>
                        Quick Ask a Question ..
                    </div>
                </div>
            </div>
        </>
    );
}