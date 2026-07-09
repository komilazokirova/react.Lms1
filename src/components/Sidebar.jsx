import React from "react";
import { menus } from "../constant";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white border-r flex flex-col">
      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-blue-600">Frontend LMS</h1>
      </div>

      <nav className="flex flex-col gap-2 p-5">
        {menus.map((menu) => (
          <NavLink
            key={menu.id}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-slate-100"
              }`
            }
          >
            {menu.icon}
            {menu.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;