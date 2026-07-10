// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Outlet />
    </div>
  );
}

export default AuthLayout;