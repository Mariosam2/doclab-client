import Tiptap from './components/TipTap/TipTap';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Loader from '@src/shared/ui/Loader/Loader';
import { showToast } from '@src/shared/helpers';
import { ToastType } from '@src/shared/enums/ToastType.enum';
import { useAuthStore } from '@src/shared/store/authStore';

const Editor = () => {
  const navigate = useNavigate();
  const { documentId } = useParams();
  const authStore = useAuthStore();
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
      token: authStore.accessToken,
      onSynced() {
        setConnection({ yDoc, provider });
      },
      onStatus({ status }) {
        console.log('status', status);
        if (status === 'disconnected') {
          showToast('Errore di connessione', 'Non è stato possibile aprire il documento', ToastType.DANGER);
          navigate('/dashboard');
        }
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
