import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useTokenStore, useUserDetailStore } from "@/store/store";
import LoadingSpinner from "@/shared-component/loading/LoadingSpinner";

export function isTokenValid(token: string): boolean {
  if (!token?.trim()) return false;
  const raw = token.trim().replace(/^Bearer\s+/i, "").trim();
  const parts = raw.split(".");
  if (parts.length !== 3) return true;
  try {
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = (4 - (base64.length % 4)) % 4;
    if (pad) base64 += "=".repeat(pad);
    const json = JSON.parse(atob(base64)) as { exp?: number };
    if (typeof json.exp === "number" && Date.now() >= json.exp * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export function useAuthStoresHydrated(): boolean {
  const [hydrated, setHydrated] = useState(
    () =>
      useTokenStore.persist.hasHydrated() && useUserDetailStore.persist.hasHydrated(),
  );

  useEffect(() => {
    const sync = () => {
      if (useTokenStore.persist.hasHydrated() && useUserDetailStore.persist.hasHydrated()) {
        setHydrated(true);
      }
    };
    sync();
    const u1 = useTokenStore.persist.onFinishHydration(sync);
    const u2 = useUserDetailStore.persist.onFinishHydration(sync);
    return () => {
      u1();
      u2();
    };
  }, []);

  return hydrated;
}

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const hydrated = useAuthStoresHydrated();
  const token = useTokenStore((state) => state.token);

  if (!hydrated) return <LoadingSpinner />;
  if (!isTokenValid(token)) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
};

export default AuthGuard;
