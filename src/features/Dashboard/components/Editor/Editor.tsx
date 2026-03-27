import Tiptap from './components/TipTap/TipTap';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loader from '@src/shared/ui/Loader/Loader';

const Editor = () => {
  const { documentId } = useParams();
  const [connection, setConnection] = useState<{
    yDoc: Y.Doc;
    provider: HocuspocusProvider;
  } | null>(null);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const provider = new HocuspocusProvider({
      url: `ws://${import.meta.env.VITE_API_HOST}/collaborative-docs`,
      name: `${documentId}`,
      document: yDoc,
      token: localStorage.getItem('accessToken'),
      onSynced() {
        setConnection({ yDoc, provider });
      },
    });

    return () => {
      provider.destroy();
      yDoc.destroy();
      setConnection(null);
    };
  }, [documentId]);

  return (
    <>
      <Loader isLoading={!connection} variant="document" />
      {connection && (
        <div className="flex-1 h-full overflow-y-auto">
          <Tiptap provider={connection.provider} yDoc={connection.yDoc} documentId={documentId} />
        </div>
      )}
    </>
  );
};

export default Editor;
