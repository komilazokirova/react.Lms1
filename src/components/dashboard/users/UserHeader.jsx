import {
  Plus,
  Image,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../Modal";

function UserHeader({ users, setUsers }) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // inputdan chiqib ketganda tekshiradi
  });

  const onSubmit = (data) => {
    const newUser = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: data.avatar,
      status: "Active",
    };

    setUsers((prev) => [...prev, newUser]);

    reset();
    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Users Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage all academy users from one place.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition-colors duration-150 hover:bg-blue-700"
        >
          <Plus size={20} />
          Create User
        </button>
      </div>

      <Modal IsOpen={open} onClose={() => setOpen(false)} title="Create User">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 p-6 md:grid-cols-2"
        >
          {/* Full name */}
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
                placeholder="Ism-familiya"
                {...register("name", {
                  required: "Ism kiritilishi shart",
                  minLength: {
                    value: 3,
                    message: "Ism kamida 3 ta harfdan iborat bo'lishi kerak",
                  },
                })}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </label>

          {/* Email */}
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
                type="text"
                placeholder="jasur@mail.com"
                {...register("email", {
                  required: "Email kiritilishi shart",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email noto'g'ri, @ belgisi va domen bo'lishi kerak",
                  },
                })}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </label>

          {/* Password */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">
              Password
            </span>
            <div className="relative">
              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="password"
                placeholder="Parol"
                {...register("password", {
                  required: "Parol kiritilishi shart",
                  minLength: {
                    value: 6,
                    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
                  },
                })}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </label>

          {/* Role */}
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Role</span>
            <div className="relative">
              <ShieldCheck
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                {...register("role", {
                  required: "Rol tanlanishi shart",
                })}
                defaultValue=""
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </label>

          {/* Avatar URL */}
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
                type="text"
                placeholder="https://example.com/avatar.jpg"
                {...register("avatar", {
                  pattern: {
                    value: /^(https?:\/\/).+/,
                    message: "URL http:// yoki https:// bilan boshlanishi kerak",
                  },
                })}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>
            {errors.avatar && (
              <p className="text-sm text-red-500">{errors.avatar.message}</p>
            )}
          </label>

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-end md:col-span-2">
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition-colors duration-150 hover:bg-blue-700"
            >
              <UserPlus size={19} />
              Create User
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default UserHeader;