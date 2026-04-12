/* import ShareButton from '@src/shared/ui/ShareButton/ShareButton'; */
import CreateDocument from './components/CreateDocument/CreateDocument';
import './Documents.css';
import DocumentList from './components/DocumentList/DocumentList';
import { useState } from 'react';
import Loader from '@src/shared/ui/Loader/Loader';
import { useProfile } from '@src/shared/hooks/useProfile';
import { useGetDocuments } from '@src/shared/hooks/useDocument';

const Documents = () => {
  const { data } = useGetDocuments();
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'mine' | 'shared'>('mine');
  const { data: profile, isLoading: profileLoading } = useProfile();

  const isLoading = profileLoading || isCreating;

  return (
    <>
      <Loader isLoading={isLoading} variant="dashboard" />
      {!isLoading && (
        <section className="documents w-full  relative py-12  px-12 flex flex-col flex-1">
          <h1 className="text-4xl mb-12 font-bold">
            Welcome {profile?.data.firstname + ' ' + profile?.data.lastname + '!'}
          </h1>
          <CreateDocument onLoadingChange={setIsCreating} />

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setActiveTab('mine')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 will-change-transform cursor-pointer ${
                activeTab === 'mine' ? 'bg-c-medium-purple text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              My documents
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 will-change-transform cursor-pointer ${
                activeTab === 'shared' ? 'bg-c-medium-purple text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              Shared with me
            </button>
          </div>

          <DocumentList
            documents={activeTab === 'mine' ? data?.data.userDocuments || [] : data?.data.editorDocuments || []}
            showActions={activeTab === 'mine'}
          />
        </section>
      )}
    </>
  );
};

export default Documents;
