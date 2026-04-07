import { Modal, Skeleton } from '@heroui/react';
import ClipboardCopy from '../Icons/ClipboardCopy';
import './ShareModal.css';
import ShareButton from '../ShareButton/ShareButton';
import { useGenerateInviteLinkMutation } from '@src/store/api/documentSlice';
import { useParams } from 'react-router';

const ShareModal = () => {
  const { documentId } = useParams();
  const [generateInviteLink, { isLoading, data }] = useGenerateInviteLinkMutation();

  const handleOpen = async () => {
    if (documentId) {
      await generateInviteLink({ documentId, permission: 'EDIT' });
    }
  };

  const inviteLink = data?.data?.inviteLink || '';

  return (
    <Modal>
      <Modal.Trigger className="ms-auto h-full" onClick={handleOpen}>
        <ShareButton className="flex items-center cursor-pointer px-2.5 py-1.5 bg-c-electric-violet text-sky-50 h-full" />
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-md p-1 rounded-xl">
            <Modal.Body>
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-10 w-full rounded-lg" />
                ) : (
                  <div className="flex-1 flex items-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50  ">
                    <h2 className=" font-semibold border-r border-gray-200 p-2.5">Share</h2>
                    <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden scrollbar-hide p-2.5">
                      {inviteLink}
                    </p>
                    <ClipboardCopy
                      btnClassName="h-full p-2.5 bg-c-medium-purple  rounded-r-lg transition-colors cursor-pointer grow w-full max-w-max"
                      svgClassName="size-5 shrink-0 text-sky-50 h-full  transition-colors"
                      text={inviteLink}
                    />
                  </div>
                )}
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ShareModal;
