import Bold from '@src/shared/ui/Icons/Bold';
import BulletList from '@src/shared/ui/Icons/BulletList';
import Heading1 from '@src/shared/ui/Icons/Heading1';
import Heading2 from '@src/shared/ui/Icons/Heading2';
import Italic from '@src/shared/ui/Icons/Italic';
import NumberedList from '@src/shared/ui/Icons/NumberedList';
import Strikethrough from '@src/shared/ui/Icons/Strikethrough';
import Underline from '@src/shared/ui/Icons/Underline';
import Highlighter from '@src/shared/ui/Icons/Highlighter';
import Code from '@src/shared/ui/Icons/Code';
import Quote from '@src/shared/ui/Icons/Quote';
import HorizontalRule from '@src/shared/ui/Icons/HorizontalRule';
import LinkIcon from '@src/shared/ui/Icons/Link';
import TaskList from '@src/shared/ui/Icons/TaskList';
import Undo from '@src/shared/ui/Icons/Undo';
import Redo from '@src/shared/ui/Icons/Redo';
import Download from '@src/shared/ui/Icons/Download';
import { Editor, useEditorState } from '@tiptap/react';
import './Toolbar.css';
import { NavLink, useParams } from 'react-router';
import ArrowLeft from '@src/shared/ui/Icons/ArrowLeft';
import Image from '@src/shared/ui/Icons/Image';
import ShareModal from '@src/shared/ui/ShareModal/ShareModal';
import { useExportPdf, useGetDocument } from '@src/shared/hooks/useDocument';

interface ToolbarProps {
  editor: Editor;
  isOwner: boolean;
  isEditable: boolean;
  uploadAndInsert: (editor: Editor, file: File, pos?: number) => void;
}

const Separator = () => <div className="w-px h-5 bg-gray-200 mx-1.5" aria-hidden="true" />;

const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  ariaLabel,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={`p-2 rounded-md transition-colors duration-150 ${
      disabled
        ? 'opacity-40 cursor-not-allowed'
        : isActive
          ? 'bg-c-periwinkle/30'
          : 'hover:bg-gray-100 active:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

const Toolbar = ({ editor, uploadAndInsert, isOwner, isEditable }: ToolbarProps) => {
  const { documentId } = useParams();
  const { data: documentData } = useGetDocument(documentId!);
  const { mutateAsync: exportPdf } = useExportPdf();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      canUndo: ctx.editor.can().undo(),
      canRedo: ctx.editor.can().redo(),
      isBold: ctx.editor.isActive('bold'),
      isItalic: ctx.editor.isActive('italic'),
      isUnderline: ctx.editor.isActive('underline'),
      isStrike: ctx.editor.isActive('strike'),
      isHighlight: ctx.editor.isActive('highlight'),
      isCode: ctx.editor.isActive('code'),
      isH1: ctx.editor.isActive('heading', { level: 1 }),
      isH2: ctx.editor.isActive('heading', { level: 2 }),
      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isTaskList: ctx.editor.isActive('taskList'),
      isBlockquote: ctx.editor.isActive('blockquote'),
      isLink: ctx.editor.isActive('link'),
    }),
  });

  const setLink = () => {
    if (!isEditable) return;
    const url = window.prompt('URL:');
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const exportDocToPdf = async () => {
    if (documentData) {
      const body = {
        htmlContent: editor.getHTML(),
        filename: documentData.data.title,
      };
      await exportPdf(body);
    }
  };

  const addImage = () => {
    if (!isEditable) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) uploadAndInsert(editor, file);
    };
    input.click();
  };

  return (
    <div className="flex items-center bg-white border-b border-gray-200 shadow-sm">
      <NavLink
        to="/dashboard/documents"
        className="flex items-center justify-center bg-c-electric-violet h-full px-3 min-w-11 hover:bg-c-medium-purple transition-colors duration-150"
        aria-label="Back to documents"
      >
        <ArrowLeft className="size-5 text-sky-50 stroke-2" />
      </NavLink>
      <div className="flex items-center gap-0.5 flex-1 sticky top-0 bg-white z-10 flex-wrap px-3 py-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={state.isBold}
          disabled={!isEditable}
          ariaLabel="Bold"
        >
          <Bold className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={state.isItalic}
          disabled={!isEditable}
          ariaLabel="Italic"
        >
          <Italic className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={state.isUnderline}
          disabled={!isEditable}
          ariaLabel="Underline"
        >
          <Underline className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={state.isStrike}
          disabled={!isEditable}
          ariaLabel="Strikethrough"
        >
          <Strikethrough className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={state.isHighlight}
          disabled={!isEditable}
          ariaLabel="Highlight"
        >
          <Highlighter className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={state.isCode}
          disabled={!isEditable}
          ariaLabel="Code"
        >
          <Code className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} disabled={!isEditable} ariaLabel="Insert image">
          <Image className="size-4.5" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={state.isH1}
          disabled={!isEditable}
          ariaLabel="Heading 1"
        >
          <Heading1 className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={state.isH2}
          disabled={!isEditable}
          ariaLabel="Heading 2"
        >
          <Heading2 className="size-4.5" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={state.isBulletList}
          disabled={!isEditable}
          ariaLabel="Bullet list"
        >
          <BulletList className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={state.isOrderedList}
          disabled={!isEditable}
          ariaLabel="Numbered list"
        >
          <NumberedList className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          isActive={state.isTaskList}
          disabled={!isEditable}
          ariaLabel="Task list"
        >
          <TaskList className="size-4.5" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={state.isBlockquote}
          disabled={!isEditable}
          ariaLabel="Blockquote"
        >
          <Quote className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={!isEditable}
          ariaLabel="Horizontal rule"
        >
          <HorizontalRule className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton onClick={setLink} isActive={state.isLink} disabled={!isEditable} ariaLabel="Insert link">
          <LinkIcon className="size-4.5" />
        </ToolbarButton>

        <Separator />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!isEditable || !state.canUndo}
          ariaLabel="Undo"
        >
          <Undo className="size-4.5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!isEditable || !state.canRedo}
          ariaLabel="Redo"
        >
          <Redo className="size-4.5" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={exportDocToPdf} ariaLabel="Export as HTML">
          <Download className="size-4.5" />
        </ToolbarButton>
      </div>
      {!isEditable && (
        <div className="flex items-center ml-auto mr-3 px-2.5 py-1 rounded-md bg-gray-100 text-gray-500 text-xs font-medium select-none whitespace-nowrap">
          <svg className="size-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          View only
        </div>
      )}
      {isOwner && <ShareModal />}
    </div>
  );
};

export default Toolbar;
