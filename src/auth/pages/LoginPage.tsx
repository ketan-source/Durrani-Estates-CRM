import { useNavigate } from "react-router";
import { useTokenStore, useUserDetailStore } from "@/store/store";
import { Login } from "./LoginDesign";

const LoginPage = () => {
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);
  const setUserDetail = useUserDetailStore((state) => state.setUserDetail);

  return (
    <Login
      initialRole="admin"
      onLogin={(role) => {
        setToken("prototype-token");
        setUserDetail({
          name:
            role === "admin"
              ? "Amina Durrani"
              : role === "management"
                ? "Mohit"
                : "Archit Batham",
          role:
            role === "admin"
              ? "Administrator"
              : role === "management"
                ? "Manager"
                : "Agent",
          workspace: role,
        });
        navigate("/dashboard");
      }}
    />
  );
};

export default LoginPage;
