import { TagChip } from "../../../../components/common/TagChip/TagChip";

import QuestionTagsStyle from "./QuestionTags.module.css";

import TagIcon from "../../../../assets/icons/tag.svg?react";
import type { TagInterface } from "../../../../types/ApiResponse/tag.type";

interface QuestionTagsProps{
    tags: TagInterface[],
}


export const QuestionTags:React.FC<QuestionTagsProps> = ({tags})=>{
    return (
        <div className={QuestionTagsStyle["container"]}>
            <div className={QuestionTagsStyle["header"]}>
                <TagIcon className={QuestionTagsStyle["tag-icon"]}/>
                <div className={QuestionTagsStyle["header-title"]}>
                    Question Tags
                </div>
            </div>
            <div className={QuestionTagsStyle["tags"]}>
                {
                    tags.map((tag)=>{
                        return <TagChip key={tag._id} slug={tag.slug} color={tag.color} text={tag.name}/>
                    })
                }
            </div>
        </div>
    );
}