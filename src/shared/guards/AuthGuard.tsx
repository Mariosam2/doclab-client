import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

interface AuthGuardProps {
  children: ReactElement;
}
const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();
  const [hasAuth, setHasAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth()
      .then(() => setHasAuth(true))
      .catch(() => {
        setHasAuth(false);
        navigate("/auth/login");
      });
  }, []);

  return hasAuth === true ? <>{children}</> : null;
};

export default AuthGuard;
