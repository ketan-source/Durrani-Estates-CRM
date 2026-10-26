import { useTokenStore } from "@/store/store";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "@/shared-component/loading/LoadingSpinner";
import { isTokenValid, useAuthStoresHydrated } from "./Auth.guard";

const ProjectGuard = ({ children }: { children: React.ReactNode }) => {
  const token = useTokenStore((state) => state.token);
  const location = useLocation();
  const hydrated = useAuthStoresHydrated();

  if (!hydrated) return <LoadingSpinner />;

  const authed = isTokenValid(token);

  if (authed && location.pathname === "/auth/login") {
    return <Navigate to="/" replace />;
  }

  if (!authed && location.pathname !== "/auth/login") {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProjectGuard;
