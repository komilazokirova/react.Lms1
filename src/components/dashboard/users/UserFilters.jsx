import { Search } from "lucide-react";

function UserFilters({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus,
  onReset,
}) {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        {/* Search */}

        <div className="relative flex-1 min-w-[250px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Role */}

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
        >
          <option value="All">All Roles</option>
          <option value="Administrator">Administrator</option>
          <option value="Mentor">Mentor</option>
          <option value="Student">Student</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={onReset}
          className="rounded-xl border border-slate-200 px-5 py-3 transition hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default UserFilters;