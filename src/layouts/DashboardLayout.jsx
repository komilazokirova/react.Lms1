// src/layouts/DashboardLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuth } from "../hook/useAuth";

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logOut();
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col border">
        <Header />
        <main className="flex-1 p-8">
          <button
            onClick={handleLogout}
            className="mb-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;