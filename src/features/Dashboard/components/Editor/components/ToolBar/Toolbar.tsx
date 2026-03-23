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
import { Editor, useEditorState } from '@tiptap/react';
import './Toolbar.css';
import { NavLink } from 'react-router';
import ArrowLeft from '@src/shared/ui/Icons/ArrowLeft';
import Image from '@src/shared/ui/Icons/Image';
import ShareModal from '@src/shared/ui/ShareModal/ShareModal';

interface ToolbarProps {
  editor: Editor;
  uploadAndInsert: (editor: Editor, file: File, pos?: number) => void;
}

const Separator = () => <div className="w-px h-5 bg-gray-300 mx-1" />;

const ToolbarButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-1.5 rounded transition-colors ${
      isActive ? 'bg-gray-200' : disabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const Toolbar = ({ editor, uploadAndInsert }: ToolbarProps) => {
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
    const url = window.prompt('URL:');
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
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
    <div className="flex items-center">
      <NavLink to="/dashboard/documents" className="bg-c-electric-violet p-2 h-full">
        <ArrowLeft className="size-6 text-sky-50 stroke-2" />
      </NavLink>
      <div className="flex items-center gap-1 border-r sticky top-0 bg-white z-10 flex-wrap p-2">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={state.isBold}>
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={state.isItalic}>
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={state.isUnderline}>
          <Underline className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={state.isStrike}>
          <Strikethrough className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={state.isHighlight}>
          <Highlighter className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={state.isCode}>
          <Code className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage}>
          <Image className="size-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={state.isH1}>
          <Heading1 className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={state.isH2}>
          <Heading2 className="size-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={state.isBulletList}>
          <BulletList className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={state.isOrderedList}>
          <NumberedList className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={state.isTaskList}>
          <TaskList className="size-4" />
        </ToolbarButton>

        <Separator />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={state.isBlockquote}>
          <Quote className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <HorizontalRule className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={setLink} isActive={state.isLink}>
          <LinkIcon className="size-4" />
        </ToolbarButton>

        <Separator />
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!state.canUndo}>
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!state.canRedo}>
          <Redo className="size-4" />
        </ToolbarButton>
      </div>
      <ShareModal />
    </div>
  );
};

export default Toolbar;
