import { Editor } from "@tiptap/react";
import type {Level} from "@tiptap/extension-heading";

import EditorToolbarStyle from "./TextEditor.module.css";

import UndoIcon from "../../../assets/icons/text_editor/undo.svg?react";
import RedoIcon from "../../../assets/icons/text_editor/redo.svg?react";
import DropdownIcon from "../../../assets/icons/general/dropdown.svg?react";
import BoldIcon from "../../../assets/icons/text_editor/bold.svg?react";
import ItalicIcon from "../../../assets/icons/text_editor/italic.svg?react";
import UnderlineIcon from "../../../assets/icons/text_editor/underline.svg?react";
import LinkIcon from "../../../assets/icons/text_editor/link.svg?react";
import ImageIcon from "../../../assets/icons/text_editor/image.svg?react";
import { useState } from "react";




interface EditorToolbarProps{
    editor : Editor | null;
}

export function EditorToolbar({editor}:EditorToolbarProps){
    if(!editor) return null;

    // const getCurrentStyle = () => {
    //   for (let level = 1; level <= 6; level++) {
    //     if (editor.isActive("Heading", { level })) {
    //       return `h${level}`;
    //     }
    //   }
    //   return "paragraph";
    // };

    const handleChange = (value: string) => {
      editor.chain().focus();

      if (value === "Normal") {
        editor.chain().focus().setParagraph().run();
      } else {
        const level = Number(value.replace("Heading", "")) as Level;
        editor.chain().focus().toggleHeading({ level }).run();
      }
    };


    const handleTextStyle = (value : string)=>{
      if(value === "Normal"){
        setTextStyle(value);
      } else{
        const level = Number(value.replace("Heading", ""));
        setTextStyle(`Heading ${level}`);
      }
      handleChange(value);
    }

    const [textStyle, setTextStyle] = useState("Normal");


    return (
<div className={EditorToolbarStyle["toolbar"]}>
      {/* Undo / Redo */}
      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }}>
        <UndoIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }}>
        <RedoIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>



      <div className={EditorToolbarStyle["text-style"]}>
        <div className={EditorToolbarStyle["current-text-style"]}>
          {textStyle}
          <DropdownIcon className={`${EditorToolbarStyle["icon"]} ${EditorToolbarStyle["dropdown-icon"]}`}/>
        </div>
        <div className={EditorToolbarStyle["text-style-options"]}>
          <div onClick={()=>{handleTextStyle("Normal")}}>Normal</div>
          <div onClick={()=>{handleTextStyle("Heading1")}}><h1>Heading 1</h1></div>
          <div onClick={()=>{handleTextStyle("Heading2")}}><h2>Heading 2</h2></div>
          <div onClick={()=>{handleTextStyle("Heading3")}}><h3>Heading 3</h3></div>
          <div onClick={()=>{handleTextStyle("Heading4")}}><h4>Heading 4</h4></div>
          <div onClick={()=>{handleTextStyle("Heading5")}}><h5>Heading 5</h5></div>
          <div onClick={()=>{handleTextStyle("Heading6")}}><h6>Heading 6</h6></div>
        </div>
      </div>


      <div className={EditorToolbarStyle["separator"]}> |</div>

      {/* Text Color */}
      <input
        className={EditorToolbarStyle["text-color"]}
        type="color"
        onInput={(e) => {
          editor.chain().focus().setColor((e.target as HTMLInputElement).value).run();
        }}
      />

      <div className={EditorToolbarStyle["separator"]}> |</div>

      {/* Bold / Italic / Underline */}
      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}>
        <BoldIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>


      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}>
        <ItalicIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>

      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }}>
        <UnderlineIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>


      {/* Link */}
      <button className={EditorToolbarStyle["button"]}
        onMouseDown={(e) => {
          e.preventDefault();
          const url = prompt("Enter URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        <LinkIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> | </div>

      {/* Image */}
      <button className={EditorToolbarStyle["button"]}
        onMouseDown={(e) => {
          e.preventDefault();
          const url = prompt("Enter image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        <ImageIcon className={EditorToolbarStyle["icon"]}/>
      </button>
    </div>
    );
}