import { Bell, ChevronDown, ChevronUp, Search, UserRound, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import Dropdown from "./dashboard/DropDown";
import { Link } from "react-router-dom";

function Header() {
  const { user, loading, logOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />

        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 rounded-lg p-2"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/100"}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/100";
              }}
            />

            <div>
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
                onClick={logOut}
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