import { ToastType } from '@src/shared/enums/ToastType.enum';
import { getErrorMessage, showToast } from '@src/shared/helpers';
import { useUpsertPermission } from '@src/shared/hooks/useDocument';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const AcceptInvite = () => {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const { mutateAsync: upsertPermission } = useUpsertPermission();

  useEffect(() => {
    if (linkId) {
      upsertPermission({ linkId })
        .then((res) => {
          if (res.success) {
            navigate(`/dashboard/documents/${res.idOut}`);
          }
        })
        .catch((err) => {
          console.error(err);
          showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
          navigate('/dashboard');
        });
    }
  }, [linkId]);
  return null;
};

export default AcceptInvite;
