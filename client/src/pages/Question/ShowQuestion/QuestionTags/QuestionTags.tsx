import { TagChip } from "../../../../components/common/TagChip/TagChip";

import QuestionTagsStyle from "./QuestionTags.module.css";

import TagIcon from "../../../../assets/icons/tag.svg?react";

export const QuestionTags = ()=>{
    return (
        <div className={QuestionTagsStyle["container"]}>
            <div className={QuestionTagsStyle["header"]}>
                <TagIcon className={QuestionTagsStyle["tag-icon"]}/>
                <div className={QuestionTagsStyle["header-title"]}>
                    Question Tags
                </div>
            </div>
            <div className={QuestionTagsStyle["tags"]}>
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