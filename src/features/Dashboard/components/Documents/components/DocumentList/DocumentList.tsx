import { useNavigate } from 'react-router';
import './DocumentList.css';
import Document from '@src/shared/ui/Icons/DocumentText';
import { useEffect } from 'react';
import type { IDocument } from '@src/shared/interfaces/document/IDocument';

interface DocumentListProps {
  documents: IDocument[];
}

const DocumentList = ({ documents }: DocumentListProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('AAA DOCUMENTS', documents);
  }, [documents]);

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
            <button
              key={doc.documentId}
              onClick={() => navigate(`/dashboard/documents/${doc.documentId}`)}
              className="group text-left rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-c-medium-purple/40 transition-all duration-200 cursor-pointer"
            >
              <div className="h-40 p-4 bg-gray-50 border-b border-gray-100 overflow-hidden">
                <div
                  className="text-[8px] leading-3 text-gray-400 line-clamp-12 pointer-events-none"
                  dangerouslySetInnerHTML={{
                    __html: doc.documentContent || '',
                  }}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentList;
