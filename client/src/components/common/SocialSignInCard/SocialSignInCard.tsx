import SocialSignInCardStyle from "./SocialSignInCardStyle.module.css"


interface SocialSignInCardProps{
    text : string;
    Icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    // If for some reason you want to use Button instead of div for card, just replace the HTMLDivElement with HTMLButtonElement 
    onClick : React.MouseEventHandler<HTMLDivElement>;
}

const SocialSignInCard:React.FC<SocialSignInCardProps> = ({Icon, text, onClick})=>{
    return (
        <>
            <div className={SocialSignInCardStyle["card-wrapper"]}>
                <div className={SocialSignInCardStyle["card"]} onClick={onClick}>
                    <Icon className={SocialSignInCardStyle["icon"]}/>
                    <p className={SocialSignInCardStyle["text"]}>{text}</p>
                </div>
            </div>
        </>
    );
}

export default SocialSignInCard;