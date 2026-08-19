import { useState } from "react";
import {
  Pencil,
  Trash2,
  User,
  Mail,
  ShieldCheck,
  Image,
  Save,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/api"; // 👈 sizning tayyor instance, path'ni moslang
import Modal from "../../Modal";

function UserRow({ user }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);
  const [avatar, setAvatar] = useState(user.avatar);

  const queryClient = useQueryClient();

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

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/users/${user.id}`), // 👈 baseURL allaqachon api.js'da bor
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setDeleteOpen(false);
    },
    onError: (error) => {
      console.log(error.response?.data || error.message);
    },
  });

  const editMutation = useMutation({
    mutationFn: (updatedUser) => api.put(`/users/${user.id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setEditOpen(false);
    },
    onError: (error) => {
      console.log(error.response?.data || error.message);
    },
  });

  function handleDelete() {
    deleteMutation.mutate();
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    editMutation.mutate({ name, email, role, status, avatar });
  }

  return (
    <>
      <tr className="border-b border-slate-100 transition hover:bg-slate-50">
        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-white"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/100";
                }}
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

        <td className="px-6 py-5">
          <span
            className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
              roleStyles[user.role] || "bg-slate-100 text-slate-600"
            }`}
          >
            {user.role}
          </span>
        </td>

        <td className="px-6 py-5">
          <span
            className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
              statusStyles[user.status] || "bg-slate-100 text-slate-600"
            }`}
          >
            {user.status}
          </span>
        </td>

        <td className="px-6 py-5 text-sm whitespace-nowrap text-slate-600">
          {user.joined}
        </td>

        <td className="px-6 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setEditOpen(true)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => setDeleteOpen(true)}
              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </td>
      </tr>

      <Modal
        IsOpen={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit User"
      >
        <form
          onSubmit={handleEditSubmit}
          className="grid gap-5 p-6 md:grid-cols-2"
        >
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Full name
            </span>
            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Email
            </span>
            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Role</span>
            <div className="relative">
              <ShieldCheck
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              >
                <option value="Administrator">Administrator</option>
                <option value="Mentor">Mentor</option>
                <option value="Student">Student</option>
                <option value="Support Teacher">Support Teacher</option>
              </select>
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Status
            </span>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Avatar URL
            </span>
            <div className="relative">
              <Image
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
          </label>

          <div className="flex justify-end border-t border-slate-100 pt-5 md:col-span-2">
            <button
              type="submit"
              disabled={editMutation.isPending}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition-colors duration-150 hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={19} />
              {editMutation.isPending ? "Saqlanmoqda..." : "Save changes"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        IsOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete User"
      >
        <div className="p-6">
          <p className="font-semibold text-slate-800">
            {user.name}ni o'chirishga aminmisiz?
          </p>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={() => setDeleteOpen(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending ? "O'chirilmoqda..." : "Ha, o'chirish"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UserRow;