import { useState } from "react";
import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import { useAppSelector } from "../../../hooks/store.hook";
import QuickAskStyle from "./QuickAsk.module.css"
import Button from "../../../components/common/Button/Button";
import { useQuickAskHander } from "./QuickAsk.handler";

export const QuickAsk = ()=>{
    const user = useAppSelector(state=>state.auth.user);
    const [questionTitle, setQuestionTitle] = useState<undefined|string>();

    const {asking, askQuestionHandler} = useQuickAskHander();

    const handleSubmit = async ()=>{
        console.log("asking quickly!!");
        if((questionTitle?.length??0) >= 10){
            await askQuestionHandler({title:questionTitle});
        }
    }

    return (
        <>
            <div className={QuickAskStyle["container"]}>
                <div className={QuickAskStyle["ask-box"]}>
                    <div className={QuickAskStyle["profile-icon-wrapper"]}>
                        <UserProfile src={user?.profile} className={QuickAskStyle["profile-icon"]}/>
                    </div>
                    <input onChange={(e)=>{setQuestionTitle(e.target.value);}} onKeyDown={(e)=>{if(e.key==="Enter" && (questionTitle?.length??0)>=10) handleSubmit();}} type="text" placeholder={"Quick Ask a Question"} className={`${QuickAskStyle["search-input"]} ${QuickAskStyle["level1"]}`}/>
                    {
                        (questionTitle?.length??0)>=10
                        &&
                        <Button loading={asking} text="Ask" isSmall={true} onClick={handleSubmit}/>
                    }
                </div>
            </div>
        </>
    );
}