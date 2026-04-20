import AskQuestionStyle from "./AskQuestion.module.css";

// Icons
import QuestionIcon from "../../../assets/icons/general/question.svg?react";
import AiIcon from "../../../assets/icons/general/ai.svg?react";
import TagIcon from "../../../assets/icons/tag.svg?react";

import Button from "../../../components/common/Button/Button";
// import type { AnswerInterface } from "../../../types/answer.types";

import { useState } from "react";

import TextEditor, { type EditorContentType } from "../../../components/common/TextEditor/TextEditor";

import InputField from "../../../components/common/InputField/InputField";

import { TagChip } from "../../../components/common/TagChip/TagChip";
import { useAskQuestionHandler } from "./AskQuestion.handler";

import type { GenerateTagPayload, TagPayload } from "../../../types/ApiRequest/tag.type";
import InlineError from "../../../components/common/InlineError/InlineError";
import type { AskQuestionPayload } from "../../../types/ApiRequest/question.type";
// import { generateTagColor } from "../../../utils/tag.util";
// import { showToast } from "../../../utils/toast.util";



export const AskQuestion = ()=>{
        // const answerObj : AnswerInterface = {
        //     author : {uid: "2", email: "thesoftaryan@gmail.com", first_name:"Aryan", last_name:"Maurya"},
        //     content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
        // }
        
        const [tagInput, setTagInput] = useState<string>("");
        const [tags, setTags] = useState<TagPayload[]>([]);
        
        const [generatingTags, setGeneratingTags] = useState(false);
        const [postingQuestion, setPostingQuestion] = useState(false);
        
        const [questionTitle, setQuestionTitle] = useState<string>("");
        const [questionDescription, setQuestionDescription] = useState<EditorContentType>();

        const [errors, setErrors] = useState<Partial<AskQuestionPayload>>({});

        // const generateTagData = {
        //             title:"What to do when a person is sufferring through cardiac arrect",
        //             description: "I recently came to a situation where a person was suffering from cardiac arrest and even after being there i wasn't able to help him. Please describe the steps need to be taken",
        //         };


        const {
            askQuestionHandler,
            generateTagHandler,
            addTagHandler,
            deleteTagHandler,
        } = useAskQuestionHandler(setErrors, setTags, setGeneratingTags, setPostingQuestion);


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
                            <InputField 
                                value={questionTitle}
                                onChange={(e)=>{
                                    setQuestionTitle(e.target.value);
                                    setErrors({});
                                }}
                                placeholder="Enter question title"
                                isError={errors.title?.length}
                            />
                            {errors.title && <InlineError message={errors.title}/>}
                        </div>
                    </div>
                    <div className={AskQuestionStyle["description-container"]}>
                        <div className={AskQuestionStyle["label"]}>Description</div>
                        <TextEditor 
                            onChange={(content)=>{
                                setQuestionDescription(content);
                                setErrors({});
                            }}
                            placeholder="Describe your question here!!"
                        />
                        {errors.description && <InlineError message={errors.description}/>}
                    </div>

                    <div className={AskQuestionStyle["tags-container"]}>
                        <div className={AskQuestionStyle["tag-input-label"]}>Tags</div>
                        <div className={AskQuestionStyle["tag-input-container"]}>
                            <input 
                             type="text" 
                             onChange={(e)=>setTagInput(e.target.value)}
                             onKeyDown={(e)=>{
                                if(e.key === "Enter"){
                                    addTagHandler(tagInput, tags);
                                }
                             }}
                             disabled={generatingTags}
                             value={tagInput} 
                             placeholder="Enter your tag" 
                             className={`${AskQuestionStyle["tag-input"]} ${generatingTags? AskQuestionStyle["disabled"]:""}`}
                            />
                            <div className={AskQuestionStyle["auto-tags"]}>
                                {!tagInput && 
                                    <Button text="Auto Tags" loading={generatingTags} Icon={AiIcon} level2={true} isSmall={true} onClick={()=>{
                                        const generateTagData:GenerateTagPayload = {
                                            title: questionTitle,
                                            description: (questionDescription?.text.trim())??"",
                                        };
                                        generateTagHandler(generateTagData)}
                                    }/>
                                }
                                {tagInput && <Button text="Add Tag" Icon={TagIcon} level2={true} isSmall={true} onClick={()=>{addTagHandler(tagInput, tags)}}/>}
                            </div>
                        </div>
                        <div className={AskQuestionStyle["curr-tags-container"]}>
                            {
                                tags.map((tag)=>{
                                    return <TagChip slug={""} Key={tag.name} text={tag.name?? ""} color={tag.color?? "red"} level1={true} onDelete={()=>{deleteTagHandler(tag.name??"")}}/>
                                })
                            }
                            {
                                !tags.length 
                                &&
                                <p className={AskQuestionStyle["no-tag-message"]}>No Tags Added</p>
                            }
                        </div>
                    </div>
                    <Button loading={postingQuestion} text="Post Question" onClick={()=>{askQuestionHandler({title: questionTitle, description: questionDescription?.text??"", descriptionHTML:questionDescription?.html??"", tags:tags})}} className={AskQuestionStyle["post-button"]}/>
            </div>
        </div>
    );
};