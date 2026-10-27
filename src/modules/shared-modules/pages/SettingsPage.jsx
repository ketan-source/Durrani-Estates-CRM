import { SettingsScreen } from "../admin/screens";
import PageFrame from "../admin/PageFrame";
import { useTokenStore, useUserDetailStore } from "@/store/store";
import { useNavigate } from "react-router";

export default function SettingsPage() {
  const setToken = useTokenStore((s) => s.setToken);
  const clearUserDetail = useUserDetailStore((s) => s.clearUserDetail);
  const navigate = useNavigate();

  return (
    <PageFrame>
      <SettingsScreen
        onLogout={() => {
          setToken("");
          clearUserDetail();
          navigate("/auth/login");
        }}
      />
    </PageFrame>
  );
}
