import IconStyle from "./Icon.module.css";

interface IconProps{
    IconData : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text? : string;
}

export const Icon : React.FC<IconProps> = ({IconData, text})=>{
    return (
        <>
            <div className={IconStyle["action-icon-container"]}>
                <IconData className={IconStyle["action-icon"]}/>
                {text && 
                    (<div className={IconStyle["text"]}>
                        {text}
                    </div>)
                }
            </div>
        </>
    );
}