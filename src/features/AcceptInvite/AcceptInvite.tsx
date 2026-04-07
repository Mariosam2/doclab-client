import { useAcceptInviteMutation } from '@src/store/api/documentSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const AcceptInvite = () => {
  const { inviteToken } = useParams();

  const [acceptInvite, { isLoading }] = useAcceptInviteMutation();

  useEffect(() => {





  }, [inviteToken]);
};

export default AcceptInvite;
