import { useEditor, EditorContent, Editor } from '@tiptap/react';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import StarterKit from '@tiptap/starter-kit';
import './TipTap.css';
import Toolbar from '../ToolBar/Toolbar';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCaret from '@tiptap/extension-collaboration-caret';
import { CURSOR_COLORS, getUserColor, showToast } from '@src/shared/helpers';
import { FileHandler } from '@tiptap/extension-file-handler';
import ResizableImage from 'tiptap-extension-resize-image';
import { useProfile } from '@src/shared/hooks/useProfile';
import { useUploadImage } from '@src/shared/hooks/useImage';
import { useGetDocumentsPermissions } from '@src/shared/hooks/useDocument';
import { useEffect, useMemo } from 'react';
import { Permission } from '@src/shared/enums/permission.enum';
import { ToastType } from '@src/shared/enums/ToastType.enum';
import { useNavigate } from 'react-router';

interface TipTapProps {
  provider: HocuspocusProvider;
  yDoc: Y.Doc;
  documentId?: string;
}

const Tiptap = ({ provider, yDoc, documentId }: TipTapProps) => {
  const navigate = useNavigate();
  const { data: profile } = useProfile();
  const { mutateAsync: uploadImage } = useUploadImage();
  const { data: permissions, isPending: permissionsLoading } = useGetDocumentsPermissions();

  const documentPermission = permissions?.data?.find((p) => p.documentId === documentId);
  const isOwner = documentPermission?.permission === Permission.OWNER;

  const uploadAndInsert = async (editor: Editor, file: File, pos?: number) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      if (documentId) formData.append('documentId', documentId);
      const result = await uploadImage(formData);
      const url = result.data.url;
      console.log(editor.getJSON());
      console.log(editor.schema.nodes);

      if (pos !== undefined) {
        editor
          .chain()
          .focus()
          .insertContentAt(pos, { type: 'imageResize', attrs: { src: url } })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .insertContent({ type: 'imageResize', attrs: { src: url } })
          .run();
      }
    } catch (err) {
      console.log(err);
      showToast('Error', 'Error while loading the image', ToastType.DANGER);
    }
  };

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit.configure({ undoRedo: false, link: { openOnClick: false } }),
      Highlight,
      TaskList,
      ResizableImage,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
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
          color: profile?.data.userId ? getUserColor(profile?.data.userId) : CURSOR_COLORS[0],
        },
        render: (user) => {
          const wrapper = document.createElement('span');
          wrapper.style.position = 'relative';

          const caret = document.createElement('span');
          caret.style.borderLeft = `2px solid ${user.color}`;
          caret.style.height = '1.2em';
          caret.style.display = 'inline-block';

          const label = document.createElement('span');
          label.textContent = user.name;
          label.style.cssText = `
            position: absolute;
            top: -1.6em;
            left: 0;
            background: ${user.color};
            color: white;
            font-size: 11px;
            padding: 2px 6px;
            border-radius: 4px 4px 4px 0;
            white-space: nowrap;
          `;

          wrapper.appendChild(caret);
          wrapper.appendChild(label);
          return wrapper;
        },
      }),
    ],
  });

  const isEditable = useMemo(() => {
    if (!documentPermission) return false;
    return documentPermission.permission === Permission.EDIT || documentPermission.permission === Permission.OWNER;
  }, [documentPermission]);

  useEffect(() => {
    if (!editor) return;

    if (documentPermission) {
      editor?.setEditable(isEditable, true);
    } else if (!permissionsLoading) {
      //redirect user to dashboard it does not have permission to view or edit
      showToast('Access denied', 'You do not have permission to view or edit this document', ToastType.DANGER);
      navigate('/dashboard');
    }
  }, [documentPermission, permissionsLoading, editor]);

  return (
    <>
      {editor && (
        <div className="flex flex-col h-full overflow-hidden">
          <Toolbar editor={editor} isEditable={isEditable} isOwner={isOwner} uploadAndInsert={uploadAndInsert} />
          <div className="flex-1 overflow-y-auto bg-gray-100 py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] min-h-full">
              <EditorContent
                editor={editor}
                className={`px-16 py-12 ${editor?.isEditable ? '' : 'opacity-85 cursor-default select-none'}`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tiptap;
