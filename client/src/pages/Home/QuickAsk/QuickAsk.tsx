import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import { useAppSelector } from "../../../hooks/store.hook";
import QuickAskStyle from "./QuickAsk.module.css"

export const QuickAsk = ()=>{
    const user = useAppSelector(state=>state.auth.user);
    return (
        <>
            <div className={QuickAskStyle["container"]}>
                <div className={QuickAskStyle["ask-box"]}>
                    <div className={QuickAskStyle["profile-icon-wrapper"]}>
                        <UserProfile src={user?.profile} className={QuickAskStyle["profile-icon"]}/>
                    </div>
                    <div className={QuickAskStyle["text"]}>
                        Quick Ask a Question ..
                    </div>
                </div>
            </div>
        </>
    );
}