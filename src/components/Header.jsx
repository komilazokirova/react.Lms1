import { Bell, ChevronDown, ChevronUp, Menu, Search, UserRound, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import Dropdown from "./dashboard/DropDown";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header({ onMenuClick }) {
  const { user, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pageName = location.pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") || "dashboard";
  const title = pageName.replace(/^./, (letter) => letter.toUpperCase());

  function handleLogout() {
    logOut();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} aria-label="Menyuni ochish" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"><Menu size={22} /></button>
        <div className="hidden sm:block"><p className="text-xs font-medium text-slate-400">Learning workspace</p><h2 className="text-sm font-bold capitalize text-slate-800">{title}</h2></div>
      </div>
      <div className="hidden w-full max-w-sm md:block">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
        />
      </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button aria-label="Bildirishnomalar" className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"><Bell size={20} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" /></button>

        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex cursor-pointer items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/100"}
              alt="user"
              className="h-9 w-9 rounded-xl object-cover"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/100";
              }}
            />

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold">
                {user?.name || "Foydalanuvchi"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role || "Student"}
              </p>
            </div>

            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          <Dropdown open={open} onClose={() => setOpen(false)}>
            <div className="w-56 p-2 space-y-1">
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
              >
                <UserRound size={18} />
                <span className="font-medium">Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut size={18} />
                <span className="font-medium">Log Out</span>
              </button>
              
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
