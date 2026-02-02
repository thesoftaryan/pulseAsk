import { TagChip } from "../TagChip/TagChip";


export const Question = ()=>{
    return (
        <>
            <div className="container">
                <TagChip text="Neumonia" color="red"/>
                <TagChip text="Heart" color="blue"/>
            </div>
        </>
    );
}