import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./TipTap.css";
import Toolbar from "../ToolBar/Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link.configure({ openOnClick: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: "<p>Hello World!</p>",
  });

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <Toolbar editor={editor} />
      <div className="flex-1 overflow-y-auto p-8">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
