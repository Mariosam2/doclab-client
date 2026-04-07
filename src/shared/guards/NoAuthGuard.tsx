import { useEffect, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

interface AuthGuardProps {
  children: ReactElement;
}
const NoAuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();
  const [hasAuth, setHasAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth()
      .then(() => {
        setHasAuth(true);
        navigate('/dashboard');
      })
      .catch(() => {
        setHasAuth(false);
      });
  }, []);

  return hasAuth === false ? <>{children}</> : null;
};

export default NoAuthGuard;
