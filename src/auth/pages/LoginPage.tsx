import { useTokenStore } from "@/store/store";

const LoginPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const setToken = useTokenStore((state) => state.setToken);
  setToken('token');

  return (
    <>
    Login
    </>
  );
};

export default LoginPage;
