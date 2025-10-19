
interface GapBoxProps{
    className:string;
}

const GapBox:React.FC<GapBoxProps> = ({className})=>{
    return (
        <>
            <div className={className}></div>
        </>
    );
}

export default GapBox;