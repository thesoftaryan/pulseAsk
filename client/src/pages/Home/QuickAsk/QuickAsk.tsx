import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import QuickAskStyle from "./QuickAsk.module.css"

export const QuickAsk = ()=>{
    return (
        <>
            <div className={QuickAskStyle["container"]}>
                <div className={QuickAskStyle["ask-box"]}>
                    <div className={QuickAskStyle["profile-icon-wrapper"]}>
                        <UserProfile className={QuickAskStyle["profile-icon"]}/>
                    </div>
                    <div className={QuickAskStyle["text"]}>
                        Quick Ask a Question ..
                    </div>
                </div>
            </div>
        </>
    );
}