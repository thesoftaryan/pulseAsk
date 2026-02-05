import IconStyle from "./Icon.module.css";

interface IconProps{
    IconData : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    text? : string;
    level2?: boolean;
    active?: boolean;
    left?: boolean;
    danger?: boolean;
}

export const Icon : React.FC<IconProps> = ({IconData, text, level2, active, left, danger})=>{
    return (
        <>
            <div className={`${IconStyle["action-icon-container"]} ${level2? IconStyle["level2"]:""}`}>
                {text && (left) && 
                    (<div className={`${IconStyle["text"]} ${active? IconStyle["active-icon"]:""} ${danger? IconStyle["danger-icon"]:""}`}>
                        {text}
                    </div>)
                }
                <IconData className={`${IconStyle["action-icon"]} ${active? IconStyle["active-icon"]:""} ${danger? IconStyle["danger-icon"]:""}`}/>
                {text && !(left) && 
                    (<div className={`${IconStyle["text"]} ${active? IconStyle["active-icon"]:""} ${danger? IconStyle["danger-icon"]:""}`}>
                        {text}
                    </div>)
                }
            </div>
        </>
    );
}