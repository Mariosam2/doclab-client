import { Modal, Skeleton } from '@heroui/react';
import ClipboardCopy from '../Icons/ClipboardCopy';
import './ShareModal.css';
import ShareButton from '../ShareButton/ShareButton';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

import { useParams } from 'react-router';
import { useSaveInviteLink } from '@src/shared/hooks/useDocument';
import { useState } from 'react';
import { Permission } from '@src/shared/enums/permission.enum';

const ShareModal = () => {
  const { documentId } = useParams();
  const [inviteLink, setInviteLink] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [permission, setPermission] = useState<Permission>(Permission.VIEW);
  const [prevPermission, setPrevPermission] = useState(permission);
  const { mutateAsync: saveInviteLink, isPending: isLoading } = useSaveInviteLink();

  const generateLink = () => {
    const identifier = uuidv4();
    setIdentifier(identifier);
    return import.meta.env.VITE_CLIENT_URL + '/dashboard/invite/' + identifier;
  };
  const handleOpen = () => {
    setInviteLink(generateLink());
  };

  if (permission !== prevPermission) {
    setPrevPermission(permission);
    setInviteLink(generateLink());
  }

  const handleOnCopy = async () => {
    if (documentId) {
      await saveInviteLink({ documentId, linkId: identifier, permission });
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
              <div className="relative flex rounded-lg bg-gray-100 p-1 mb-3 overflow-x-hidden">
                <motion.div
                  className="absolute top-1 bottom-1 w-[calc(50%-2px)] bg-c-medium-purple rounded-md"
                  animate={{
                    x: permission === Permission.VIEW ? 0 : '100%',
                    scaleX: [1, 1.06, 0.96, 1],
                    scaleY: [1, 0.94, 1.04, 1],
                  }}
                  transition={{
                    x: { type: 'spring', stiffness: 400, damping: 28, mass: 0.8 },
                    scaleX: { duration: 0.3, times: [0, 0.25, 0.6, 1] },
                    scaleY: { duration: 0.3, times: [0, 0.25, 0.6, 1] },
                  }}
                  style={{ left: 4 }}
                />
                {[Permission.VIEW, Permission.EDIT].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPermission(value)}
                    className="relative flex-1 rounded-md px-4 py-1.5 text-sm font-medium cursor-pointer z-10"
                    aria-pressed={permission === value}
                    role="tab"
                  >
                    <span
                      className={`relative ${permission === value ? 'text-sky-50' : 'text-gray-600'} transition-colors duration-200`}
                    >
                      {value === Permission.VIEW ? 'View' : 'Edit'}
                    </span>
                  </button>
                ))}
              </div>
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
