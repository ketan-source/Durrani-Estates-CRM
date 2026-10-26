import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-svh w-full">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout