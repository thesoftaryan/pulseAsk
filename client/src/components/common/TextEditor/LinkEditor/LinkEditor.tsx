import { useEditorState, type Editor } from "@tiptap/react";
import LinkEditorStyle from "./LinkEditor.module.css";

import { useEffect, useState } from "react";
import Button from "../../Button/Button";



export const LinkEditor = ({editor} : {editor: Editor})=>{

    const editorState = useEditorState({
      editor,
      selector:({editor})=>{
        return {
          isLink: editor.isActive("link"),
        }
      }
    });

    const [url, setUrl] = useState("");

    useEffect(()=>{
        const prevUrl = editor.getAttributes("link").href || "";
        setUrl(prevUrl);
    }, [editorState.isLink]);

    const updateLink = ()=>{
        if(!url){
            editor.chain().focus().unsetLink().run();
            return;
        }
        editor.chain().focus().setLink({href: url}).run();
    }

    return (
        <div className={LinkEditorStyle["container"]}>
            <input type="text" value={url} placeholder="Enter URL" onChange={(e)=>{setUrl(e.target.value)}} className={LinkEditorStyle["input-field"]}/>
            <Button isSmall={true} onClick={updateLink} text="Save"/>
        </div>
    );
}