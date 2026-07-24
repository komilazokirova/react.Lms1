import { Pencil, Trash2 } from "lucide-react";

function UserRow({ user }) {
  const roleStyles = {
    Administrator: "bg-blue-100 text-blue-700",
    Mentor: "bg-purple-100 text-purple-700",
    Student: "bg-orange-100 text-orange-700",
    "Support Teacher": "bg-cyan-100 text-cyan-700",
  };

  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-600",
    Blocked: "bg-red-100 text-red-700",
  };

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      {/* User */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
            />

            {user.status === "Active" && (
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-800">
              {user.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-slate-500">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-5">
        <span
          className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${roleStyles[user.role]}`}
        >
          {user.role}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${statusStyles[user.status]}`}
        >
          {user.status}
        </span>
      </td>

      {/* Joined */}
      <td className="px-6 py-5 text-sm whitespace-nowrap text-slate-600">
        {user.joined}
      </td>

      {/* Actions */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600">
            <Pencil size={18} />
          </button>

          <button className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-600">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UserRow;