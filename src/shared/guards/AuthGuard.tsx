import { useEffect, useState, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';

interface AuthGuardProps {
  children: ReactElement;
}
const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth } = useAuthStore();
  const [hasAuth, setHasAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth()
      .then(() => setHasAuth(true))
      .catch((err) => {
        console.log(err);
        setHasAuth(false);
        console.log(location.pathname);
        sessionStorage.setItem('redirectAfterLogin', location.pathname);
        navigate('/auth/login');
      });
  }, []);

  return hasAuth === true ? <>{children}</> : null;
};

export default AuthGuard;
