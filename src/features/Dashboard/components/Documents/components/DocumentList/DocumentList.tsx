import { useNavigate } from 'react-router';
import './DocumentList.css';
import Document from '@src/shared/ui/Icons/DocumentText';
import Pencil from '@src/shared/ui/Icons/Pencil';
import Trash from '@src/shared/ui/Icons/Trash';
import { useState } from 'react';
import type { IDocument } from '@src/shared/interfaces/document/IDocument';
import { Modal } from '@heroui/react';
import { useDeleteDocument, useUpdateDocument } from '@src/shared/hooks/useDocument';
import { showToast } from '@src/shared/helpers';
import { ToastType } from '@src/shared/enums/ToastType.enum';

interface DocumentListProps {
  documents: IDocument[];
  showActions?: boolean;
}

const DocumentList = ({ documents, showActions = false }: DocumentListProps) => {
  const navigate = useNavigate();

  const [renameDoc, setRenameDoc] = useState<IDocument | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleteDoc, setDeleteDoc] = useState<IDocument | null>(null);

  const { mutateAsync: updateDocument, isPending: isRenaming } = useUpdateDocument();
  const { mutateAsync: deleteDocument, isPending: isDeleting } = useDeleteDocument();

  const openRename = (doc: IDocument) => {
    setRenameDoc(doc);
    setRenameValue(doc.title || '');
  };

  const handleRename = async () => {
    if (!renameDoc) return;
    const trimmed = renameValue.trim();
    if (trimmed.length < 4 || trimmed.length > 30) {
      showToast('Invalid title', 'Title must be between 4 and 30 characters', ToastType.WARNING);
      return;
    }
    try {
      await updateDocument({ documentId: renameDoc.documentId, title: trimmed });
      showToast('Document renamed', 'Title updated successfully', ToastType.SUCCESS);
      setRenameDoc(null);
    } catch {
      showToast('Error', 'Could not rename document', ToastType.DANGER);
    }
  };

  const handleDelete = async () => {
    if (!deleteDoc) return;
    try {
      await deleteDocument(deleteDoc.documentId);
      showToast('Document deleted', `"${deleteDoc.title || 'Untitled'}" has been removed`, ToastType.SUCCESS);
      setDeleteDoc(null);
    } catch {
      showToast('Error', 'Could not delete document', ToastType.DANGER);
    }
  };

  return (
    <div className="flex flex-col grow pt-12">
      {documents.length == 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <div className="size-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Document className="size-14 text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">No documents yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "New document" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.documentId}
              className="group relative text-left rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-c-medium-purple/40 transition-all duration-200 bg-white"
            >
              <button
                type="button"
                onClick={() => navigate(`/dashboard/documents/${doc.documentId}`)}
                className="w-full text-left cursor-pointer"
                aria-label={`Open ${doc.title || 'Untitled'}`}
              >
                <div className="h-40 relative p-4 bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <div
                    className="pointer-events-none absolute inset-0 origin-top-left p-12"
                    style={{
                      transform: 'scale(0.3)',
                      width: '333%',
                      height: '333%',
                    }}
                    dangerouslySetInnerHTML={{ __html: doc.documentPreview || '' }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 truncate group-hover:text-c-medium-purple transition-colors">
                    {doc.title || 'Untitled'}
                  </h3>
                  {doc.updatedAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(doc.updatedAt).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </button>

              {showActions && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openRename(doc);
                    }}
                    className="size-7 rounded-md bg-white/95 backdrop-blur border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-c-electric-violet hover:border-c-medium-purple/40 transition-colors cursor-pointer"
                    aria-label={`Rename ${doc.title || 'Untitled'}`}
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteDoc(doc);
                    }}
                    className="size-7 rounded-md bg-white/95 backdrop-blur border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-300 transition-colors cursor-pointer"
                    aria-label={`Delete ${doc.title || 'Untitled'}`}
                  >
                    <Trash className="size-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rename modal */}
      <Modal isOpen={!!renameDoc} onOpenChange={(open) => !open && setRenameDoc(null)}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-w-md p-5 rounded-xl">
              <Modal.Body>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Rename document</h2>
                <p className="text-sm text-gray-500 mb-4">Enter a new title (4-30 characters).</p>
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename();
                    if (e.key === 'Escape') setRenameDoc(null);
                  }}
                  autoFocus
                  maxLength={30}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-c-medium-purple focus:ring-2 focus:ring-c-medium-purple/20 text-sm"
                  placeholder="Document title"
                />
                <div className="flex justify-end gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => setRenameDoc(null)}
                    disabled={isRenaming}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRename}
                    disabled={isRenaming}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-c-electric-violet hover:bg-c-medium-purple text-sky-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isRenaming ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal isOpen={!!deleteDoc} onOpenChange={(open) => !open && setDeleteDoc(null)}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="max-w-md p-5 rounded-xl">
              <Modal.Body>
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <Trash className="size-5 text-red-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Delete document</h2>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Are you sure you want to delete
                  <span className="font-medium text-gray-800">"{deleteDoc?.title || 'Untitled'}"</span>? <br></br>
                  This action cannot be undone.
                </p>

                <div className="flex justify-end gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => setDeleteDoc(null)}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default DocumentList;
