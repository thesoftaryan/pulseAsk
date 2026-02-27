import ChatStyle from "./Chat.module.css";

export const Chat = ()=>{
    return (
        <div className={ChatStyle["container"]}>
            <div className={ChatStyle["left"]}>
                <div className={ChatStyle["label"]}></div>
                <div className={ChatStyle["search-bar"]}></div>
                <div className={ChatStyle["persons"]}></div>
            </div>
            <div className={ChatStyle["right"]}>
                <div className={ChatStyle["header"]}>
                    <div className={ChatStyle["person-profile"]}></div>
                    <div className={ChatStyle["person-actions"]}></div>
                </div>
                <div className={ChatStyle["message"]}>

                </div>
                <div className={ChatStyle["message-input-container"]}>
                    <div className={ChatStyle["message-attachment"]}></div>
                    <div className={ChatStyle["message-input"]}></div>
                    
                </div>
            </div>
        </div>
    );
}