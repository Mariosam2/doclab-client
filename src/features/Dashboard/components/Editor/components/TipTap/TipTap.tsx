import { useEditor, EditorContent, Editor } from "@tiptap/react";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import StarterKit from "@tiptap/starter-kit";
import "./TipTap.css";
import Toolbar from "../ToolBar/Toolbar";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import { useGetProfileQuery } from "@src/store/api/profileSlice";
import { CURSOR_COLORS, getUserColor } from "@src/shared/helpers";
import { FileHandler } from "@tiptap/extension-file-handler";
import { Image } from "@tiptap/extension-image";
import { useUploadImageMutation } from "@src/store/api/imageSlice";

interface TipTapProps {
  provider: HocuspocusProvider;
  yDoc: Y.Doc;
  documentId?: string;
}

const Tiptap = ({ provider, yDoc, documentId }: TipTapProps) => {
  const { data: profile } = useGetProfileQuery();
  const [upload] = useUploadImageMutation();

  const uploadAndInsert = async (editor: Editor, file: File, pos?: number) => {
    const formData = new FormData();
    formData.append("image", file);
    if (documentId) formData.append("documentId", documentId);
    const result = await upload(formData).unwrap();
    const url = result.data.url;

    if (pos !== undefined) {
      editor
        .chain()
        .focus()
        .insertContentAt(pos, { type: "image", attrs: { src: url } })
        .run();
    } else {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ undoRedo: false, link: { openOnClick: false } }),
      Highlight,
      TaskList,
      Image,
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (editor, files, pos) => {
          files.forEach((file) => uploadAndInsert(editor, file, pos));
        },
        onPaste: (editor, files) => {
          files.forEach((file) => uploadAndInsert(editor, file));
        },
      }),
      TaskItem.configure({ nested: true }),
      Collaboration.configure({
        document: yDoc,
      }),
      CollaborationCaret.configure({
        provider,

        user: {
          name: profile?.data.username,
          color: profile?.data.userId
            ? getUserColor(profile?.data.userId)
            : CURSOR_COLORS[0],
        },
      }),
    ],
  });

  return (
    <>
      {editor && (
        <div className="flex flex-col h-full border  overflow-hidden">
          <Toolbar editor={editor} uploadAndInsert={uploadAndInsert} />
          <div className="flex-1 overflow-y-auto p-8 border border-c-muted">
            <EditorContent editor={editor} />
          </div>
        </div>
      )}
    </>
  );
};

export default Tiptap;
