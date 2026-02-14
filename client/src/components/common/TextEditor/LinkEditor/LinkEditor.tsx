import { useEditorState, type Editor } from "@tiptap/react";
import LinkEditorStyle from "./LinkEditor.module.css";

import { useEffect, useState } from "react";



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
        <div className="container">
            <input type="text" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
            <button onClick={updateLink}>Save</button>
        </div>
    );
}