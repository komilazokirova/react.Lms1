import { menus } from "../constant";
import { NavLink } from "react-router-dom";
import { GraduationCap, X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <button aria-label="Menyuni yopish" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200"><GraduationCap size={22} /></span>
          <div><h1 className="font-bold tracking-tight text-slate-900">EduFlow</h1><p className="text-xs text-slate-400">Learning platform</p></div>
        </div>
        <button onClick={onClose} aria-label="Yopish" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><X size={20} /></button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Menu</p>
        {menus.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-100" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`
            }
          >
            {menu.icon}
            {menu.title}
          </NavLink>
        ))}
      </nav>
      <div className="m-4 rounded-xl bg-slate-50 p-4"><p className="text-sm font-semibold text-slate-800">Keep learning</p><p className="mt-1 text-xs leading-5 text-slate-500">Bugun bir darsni tugatib, maqsadingizga yaqinlashing.</p></div>
    </aside>
    </>
  );
};

export default Sidebar;
