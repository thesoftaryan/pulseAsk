import { Editor, useEditorState } from "@tiptap/react";
import type {Level} from "@tiptap/extension-heading";

import EditorToolbarStyle from "./TextEditor.module.css";

import imageCompression from "browser-image-compression";

import UndoIcon from "../../../assets/icons/text_editor/undo.svg?react";
import RedoIcon from "../../../assets/icons/text_editor/redo.svg?react";
import DropdownIcon from "../../../assets/icons/general/dropdown.svg?react";
import BoldIcon from "../../../assets/icons/text_editor/bold.svg?react";
import ItalicIcon from "../../../assets/icons/text_editor/italic.svg?react";
import UnderlineIcon from "../../../assets/icons/text_editor/underline.svg?react";
import LinkIcon from "../../../assets/icons/text_editor/link.svg?react";
import ImageIcon from "../../../assets/icons/text_editor/image.svg?react";
import { useRef, useState } from "react";
import { showToast } from "../../../utils/toast.util";
import { uploadImageHandler } from "./ImageHandler/Image.handler";




interface EditorToolbarProps{
    editor : Editor | null;
}

export function EditorToolbar({editor}:EditorToolbarProps){
    if(!editor) return null;

    const editorState = useEditorState({
      editor,
      selector:({editor})=>{
        let currentStyle = "Normal";

        for (let level = 1; level <= 6; level++) {
          if (editor.isActive("heading", { level })) {
            currentStyle = `Heading${level}`;
            break;
          }
        }
        return {
          isBold: editor.isActive("bold"),
          isItalic: editor.isActive("italic"),
          isUnderline: editor.isActive("underline"),
          isLink: editor.isActive("link"),
          currentStyle,
        }
      }
    });

    const handleChange = (value: string) => {
      editor.chain().focus();

      if (value === "Normal") {
        editor.chain().focus().setParagraph().run();
      } else {
        const level = Number(value.replace("Heading", "")) as Level;
        editor.chain().focus().toggleHeading({ level }).run();
      }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>)=>{
      const file = event.target.files?.[0];
      if(!file) return;
      if (!file.type.startsWith("image/")){
        showToast.error("Only images are allowed");
        return;
      }
      if(file.size > 5*1024*1024){
        showToast.error("Max file size is 5MB");
        return;
      }

      setUploading(true);

      editor.chain().focus().setImage({
        src: ""
      }).run();

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      });
      console.log(compressedFile);

      await uploadImageHandler(compressedFile, editor.chain().focus());
      setUploading(false);

    }


    // const textStyleRef = useRef<HTMLDivElement>(null);

    // useEffect(()=>{
    //     // const handleClickOutside = (event : MouseEvent)=>{
    //     //     if(textStyleRef.current && !textStyleRef.current.contains(event.target as Node)){
    //     //         setOpenTextStyle(false);
    //     //     }
    //     // }
    //     // document.addEventListener("mousedown", handleClickOutside);
    //     // return ()=>{
    //     //     document.removeEventListener("mousedown", handleClickOutside);
    //     // }
    // }, []);

    const [uploading, setUploading] = useState(false);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const [openTextStyle, setOpenTextStyle] = useState(false);


    return (
<div className={EditorToolbarStyle["toolbar"]}>
      {/* Undo / Redo */}
      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().undo().run();}}>
        <UndoIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().redo().run();}}>
        <RedoIcon className={EditorToolbarStyle["icon"]}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>



      <div onClick={()=>{setOpenTextStyle(!openTextStyle)}} className={EditorToolbarStyle["text-style"]}>
        <div className={EditorToolbarStyle["current-text-style"]}>
          {editorState.currentStyle}
          <DropdownIcon className={`${EditorToolbarStyle["icon"]} ${EditorToolbarStyle["dropdown-icon"]}`}/>
        </div>
        {
          openTextStyle && (
          <div className={EditorToolbarStyle["text-style-options"]}>
            <div onClick={()=>{handleChange("Normal")}}>Normal</div>
            <div onClick={()=>{handleChange("Heading1")}}><h1>Heading 1</h1></div>
            <div onClick={()=>{handleChange("Heading2")}}><h2>Heading 2</h2></div>
            <div onClick={()=>{handleChange("Heading3")}}><h3>Heading 3</h3></div>
            <div onClick={()=>{handleChange("Heading4")}}><h4>Heading 4</h4></div>
            <div onClick={()=>{handleChange("Heading5")}}><h5>Heading 5</h5></div>
            <div onClick={()=>{handleChange("Heading6")}}><h6>Heading 6</h6></div>
          </div>
          )
        }
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
        <BoldIcon className={`${EditorToolbarStyle["icon"]} ${editorState.isBold? EditorToolbarStyle["active"]:""}`}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>


      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}>
        <ItalicIcon className={`${EditorToolbarStyle["icon"]} ${editorState.isItalic? EditorToolbarStyle["active"]:""}`}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>

      <button className={EditorToolbarStyle["button"]} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }}>
        <UnderlineIcon className={`${EditorToolbarStyle["icon"]} ${editorState.isUnderline? EditorToolbarStyle["active"]:""}`}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> |</div>


      {/* Link */}
      <button className={EditorToolbarStyle["button"]}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().setLink({ href: "" }).run();
        }}
      >
        <LinkIcon className={`${EditorToolbarStyle["icon"]} ${editorState.isLink? EditorToolbarStyle["active"]:""}`}/>
      </button>

      <div className={EditorToolbarStyle["separator"]}> | </div>

      {/* Image */}
      <input type="file" accept="image/*" ref={inputFileRef} onChange={handleImageUpload} className={EditorToolbarStyle["file-input"]}/>
      <button disabled={uploading} className={EditorToolbarStyle["button"]}
        onMouseDown={(e) => {
          e.preventDefault();
          inputFileRef.current?.click();
        }}
      >
        <ImageIcon className={`${EditorToolbarStyle["icon"]}`}/>
      </button>
    </div>
    );
}