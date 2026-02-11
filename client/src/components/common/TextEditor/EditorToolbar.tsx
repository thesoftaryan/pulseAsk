import { Editor } from "@tiptap/react";

interface EditorToolbarProps{
    editor : Editor | null;
}

export function EditorToolbar({editor}:EditorToolbarProps){
    if(!editor) return null;
    return (
<div className="toolbar">
      {/* Undo / Redo */}
      <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().undo().run(); }}>
        Undo
      </button>

      <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().redo().run(); }}>
        Redo
      </button>

      {/* Normal Text */}
      <button onMouseDown={(e) => {
        e.preventDefault();
        editor.chain().focus().setParagraph().run();
      }}>
        Normal
      </button>

      {/* Headings */}
      <button onMouseDown={(e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 2 }).run();
      }}>
        H2
      </button>

      {/* Bold / Italic / Underline */}
      <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }}>
        B
      </button>

      <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }}>
        I
      </button>

      <button onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }}>
        U
      </button>


      {/* Text Color */}
      <input
        type="color"
        onInput={(e) => {
          editor.chain().focus().setColor((e.target as HTMLInputElement).value).run();
        }}
      />

      {/* Link */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          const url = prompt("Enter URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
      >
        Link
      </button>

      {/* Image */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          const url = prompt("Enter image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
      >
        Image
      </button>
    </div>
    );
}