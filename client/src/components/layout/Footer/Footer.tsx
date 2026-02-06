import FooterStyle from "./Footer.module.css";

export const Footer = ()=>{
    return (
        <div className={FooterStyle["container"]}>
            <div className={FooterStyle["copyright-message"]}>
                PulseAsk © 2026. All rights reserved
            </div>
            <div className={FooterStyle["message"]}>
                Made with <span className={FooterStyle["heart"]}>💖</span> By PulseAsk
            </div>
        </div>
    );
};