import { TagChip } from "../../../../components/common/TagChip/TagChip";

import TagIcon from "../../../../assets/icons/tag.svg?react";

export const QuestionTags = ()=>{
    return (
        <div className="container">
            <div className="header">
                <TagIcon/>
                <div className="header-title">
                    QuestionTags
                </div>
            </div>
            <div className="tags">
                <TagChip color="red" text="Heart Attack"/>
                <TagChip color="yellow" text="Heart Attack"/>
                <TagChip color="blue" text="Heart"/>
                <TagChip color="green" text="Heart Revive"/>
                <TagChip color="skyblue" text="Heart Fail"/>
                <TagChip color="magenta" text="Neumonia"/>
                <TagChip color="black" text="Heart Attack"/>
                <TagChip color="grey" text="Heart Attack"/>
                <TagChip color="lightgreen" text="Heart Attack"/>
            </div>
        </div>
    );
}