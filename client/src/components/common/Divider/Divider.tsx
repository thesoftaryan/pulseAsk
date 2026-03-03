import DividerStyle from "./Divider.module.css"

interface DividerProps{
    text?:string,
    color?: string,
}

const Divider:React.FC<DividerProps> = ({text, color})=>{
    return (
        <>
            <div className={DividerStyle["divider-wrapper"]}>
                <hr style={{borderColor: color}} className={`${DividerStyle["left-line"]} ${(!text)? DividerStyle["no-margin-right"]:""}`} />
                <span  style={{color: color}}  className={DividerStyle["text"]}>{text}</span>
                <hr style={{borderColor: color}} className={`${DividerStyle["right-line"]} ${(!text)? DividerStyle["no-margin-left"]:""}`} />
            </div>
        </>
    );
}

export default Divider;