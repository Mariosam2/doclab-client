import { useCheckAuthMutation } from "@src/store/api/authSlice";
import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router";

interface AuthGuardProps {
  children: ReactElement;
}
const NoAuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const [checkAuth] = useCheckAuthMutation();
  const [hasAuth, setHasAuth] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth()
      .unwrap()
      .then(() => {
        setHasAuth(true);
        navigate("/dashboard");
      })
      .catch(() => {
        setHasAuth(false);
      });
  }, []);

  return hasAuth === false ? <>{children}</> : null;
};

export default NoAuthGuard;
