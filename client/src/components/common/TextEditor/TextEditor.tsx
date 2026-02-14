import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { BubbleMenu } from "@tiptap/react/menus";

import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import { EditorToolbar } from "./EditorToolbar";
// import { useEffect } from "react";
import TextEditorStyle from "./TextEditor.module.css";
import { LinkEditor } from "./LinkEditor/LinkEditor";


interface TextEditorProps{
    placeholder? : string;
    onChange : (content: JSONContent)=>void;
}

export default function TextEditor({placeholder, onChange} : TextEditorProps){
    const editor = useEditor({
        extensions:[
            StarterKit.configure(
                {
                    link:false,
                }
            ),
            TextStyle,
            Color,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            Placeholder.configure({
                placeholder: placeholder
            })
        ],
        content: "",
        onUpdate({editor}){
            onChange(editor.getJSON());
        },
        injectCSS: true,
    });
    return (
        <div className={TextEditorStyle["editor-container"]}>
            <EditorToolbar editor={editor}/>
            {editor && (
                <BubbleMenu
                    editor={editor}
                    shouldShow={({ editor }) =>
                        editor.isActive("link")
                    }
                >
                    {/* <SimpleLinkBubble editor={editor} /> */}
                    <LinkEditor editor={editor}/>
                </BubbleMenu>
                )
            }
            <EditorContent editor={editor}  className={TextEditorStyle["editor-content"]}/>
        </div>
    );
}