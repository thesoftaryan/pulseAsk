import AskQuestionStyle from "./AskQuestion.module.css";

// Icons
import QuestionIcon from "../../../assets/icons/general/question.svg?react";
import AiIcon from "../../../assets/icons/general/ai.svg?react";
import TagIcon from "../../../assets/icons/tag.svg?react";

import Button from "../../../components/common/Button/Button";
// import type { AnswerInterface } from "../../../types/answer.types";

import { useState } from "react";

import TextEditor from "../../../components/common/TextEditor/TextEditor";
import type { JSONContent } from "@tiptap/react";
import InputField from "../../../components/common/InputField/InputField";

import { TagChip } from "../../../components/common/TagChip/TagChip";
import { useAskQuestionHandler } from "./AskQuestion.handler";
import type { TagInterface } from "../../../types/ApiResponse/tag.type";
import { generateTagColor } from "../../../utils/tag.util";





export const AskQuestion = ()=>{
        // const answerObj : AnswerInterface = {
        //     author : {uid: "2", email: "thesoftaryan@gmail.com", first_name:"Aryan", last_name:"Maurya"},
        //     content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
        // }
        const [answerContent, setAnswerContent] = useState<JSONContent | null>(null);

        const [tagInput, setTagInput] = useState<string>("");
        const [tags, setTags] = useState<Partial<TagInterface>[]>([]);

        const generateTagData = {
                    title:"What to do when a person is sufferring through cardiac arrect",
                    description: "I recently came to a situation where a person was suffering from cardiac arrest and even after being there i wasn't able to help him. Please describe the steps need to be taken",
                };


        const {generateTagHandler} = useAskQuestionHandler();

        const handleTagGenerate = ()=>{
            generateTagHandler(generateTagData, setTags);
        }

        const handleTagAddition = ()=>{
            if(!tagInput) return;
            const newTag = {name: tagInput, color: generateTagColor(tagInput)};
            setTags([...tags, newTag]);
        }

    return (
        <div className={AskQuestionStyle["container"]}>
            <div className={AskQuestionStyle["main-content"]}>
                    <div className={AskQuestionStyle["page-title-container"]}>
                        <QuestionIcon className={AskQuestionStyle["question-icon"]}/>
                        <div className={AskQuestionStyle["page-title"]}>Ask a question</div>
                    </div>
                    <div className={AskQuestionStyle["title-container"]}>
                        <div className={AskQuestionStyle["label"]}>Title</div>
                        <div className={AskQuestionStyle["title-input"]}>
                            <InputField  placeholder="Enter question title"/>
                        </div>
                    </div>
                    <div className={AskQuestionStyle["description-container"]}>
                        <div className={AskQuestionStyle["label"]}>Description</div>
                        <TextEditor onChange={setAnswerContent} placeholder="Describe your question here!!"/>
                    </div>

                    <div className={AskQuestionStyle["tags-container"]}>
                        <div className={AskQuestionStyle["tag-input-label"]}>Tags</div>
                        <div className={AskQuestionStyle["tag-input-container"]}>
                            <input type="text" onChange={(e)=>setTagInput(e.target.value)} value={tagInput} placeholder="Enter your tag" className={AskQuestionStyle["tag-input"]}/>
                            <div className={AskQuestionStyle["auto-tags"]}>
                                {!tagInput && <Button text="Auto Tags" Icon={AiIcon} level2={true} isSmall={true} onClick={handleTagGenerate}/>}
                                {tagInput && <Button text="Add Tag" Icon={TagIcon} level2={true} isSmall={true} onClick={handleTagAddition}/>}
                            </div>
                        </div>
                        <div className={AskQuestionStyle["curr-tags-container"]}>
                            {
                                tags.map((tag)=>{
                                    return <TagChip text={tag.name?? ""} color={tag.color?? "red"} level1={true} onDelete={()=>{}}/>
                                })
                            }
                            {
                                !tags.length 
                                &&
                                <p>No Tags Added Yet</p>
                            }
                            {/* <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/>
                            <TagChip text="Heart" color="red" level1={true} onDelete={()=>{}}/> */}
                        </div>
                    </div>
                    <Button text="Post Question" onClick={()=>{console.log(answerContent)}} className={AskQuestionStyle["post-button"]}/>
            </div>
        </div>
    );
};