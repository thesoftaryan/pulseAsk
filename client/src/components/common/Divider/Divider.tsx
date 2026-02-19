import DividerStyle from "./Divider.module.css"

interface DividerProps{
    text?:string,
}

const Divider:React.FC<DividerProps> = ({text})=>{
    return (
        <>
            <div className={DividerStyle["divider-wrapper"]}>
                <hr className={`${DividerStyle["left-line"]} ${(!text)? DividerStyle["no-margin-right"]:""}`} />
                <span className={DividerStyle["text"]}>{text}</span>
                <hr className={`${DividerStyle["right-line"]} ${(!text)? DividerStyle["no-margin-left"]:""}`} />
            </div>
        </>
    );
}

export default Divider;