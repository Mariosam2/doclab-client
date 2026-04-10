import { Modal, Skeleton } from '@heroui/react';
import ClipboardCopy from '../Icons/ClipboardCopy';
import './ShareModal.css';
import ShareButton from '../ShareButton/ShareButton';
import { v4 as uuidv4 } from 'uuid';
import { motion, LayoutGroup } from 'framer-motion';

import { useParams } from 'react-router';
import { useSaveInviteLink } from '@src/shared/hooks/useDocument';
import { useState } from 'react';
import { Permission } from '@src/shared/enums/Permission.enum';

const ShareModal = () => {
  const { documentId } = useParams();
  const [inviteLink, setInviteLink] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [permission, setPermission] = useState<Permission>(Permission.VIEW);
  const { mutateAsync: saveInviteLink, isPending: isLoading } = useSaveInviteLink();

  const handleOpen = async () => {
    if (documentId) {
      setInviteLink(generateLink());
    }
  };

  const generateLink = () => {
    const identifier = uuidv4();
    setIdentifier(identifier);
    return import.meta.env.VITE_CLIENT_URL + '/invite/' + identifier;
  };

  const handleOnCopy = async () => {
    if (documentId) {
      await saveInviteLink({ documentId, uuid: identifier, permission });
    }
  };

  return (
    <Modal>
      <Modal.Trigger className="ms-auto h-full" onClick={handleOpen}>
        <ShareButton className="flex items-center cursor-pointer px-2.5 py-1.5 bg-c-electric-violet text-sky-50 h-full" />
      </Modal.Trigger>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-md p-1 rounded-xl">
            <Modal.Body>
              <LayoutGroup>
                <div className="flex rounded-lg bg-gray-100 p-1 mb-3">
                  {[Permission.VIEW, Permission.EDIT].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPermission(value)}
                      className="relative flex-1 rounded-md px-4 py-1.5 text-sm font-medium cursor-pointer z-0"
                    >
                      {permission === value && (
                        <motion.div
                          layoutId="permission-toggle"
                          className="absolute inset-0 bg-c-medium-purple rounded-md"
                          animate={{
                            scaleX: [1, 1.12, 0.92, 1.03, 1],
                            scaleY: [1, 0.88, 1.08, 0.97, 1],
                          }}
                          transition={{
                            layout: { type: 'spring', stiffness: 400, damping: 24, mass: 0.8 },
                            scaleX: { duration: 0.4, times: [0, 0.2, 0.5, 0.75, 1] },
                            scaleY: { duration: 0.4, times: [0, 0.2, 0.5, 0.75, 1] },
                          }}
                        />
                      )}
                      <span className={`relative z-10 ${permission === value ? 'text-sky-50' : 'text-gray-600'}`}>
                        {value === Permission.VIEW ? 'View' : 'Edit'}
                      </span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
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
                      onCopy={handleOnCopy}
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
