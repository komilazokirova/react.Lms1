import { useState } from "react";
import {
  User,
  Mail,
  Image,
  Lock,
  LogOut,
  Save,
  ShieldAlert,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hook/useAuth";
import { useToast } from "../../context/ToastContext";

import Modal from "../../components/Modal";
import { api } from "../../api/api";



const FALLBACK_AVATAR = "https://i.pravatar.cc/300?img=12";

const profileSchema = z.object({
  name: z.string().min(1, "Ism kiritilishi shart").min(3, "Kamida 3 ta harf bo'lishi kerak"),
  avatar: z
    .string()
    .min(1, "Rasm URL kiritilishi shart")
    .regex(/^(https?:\/\/).+/, "URL http:// yoki https:// bilan boshlanishi kerak"),
});

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Yangi parol kiritilishi shart")
      .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak"),
    confirmPassword: z.string().min(1, "Parolni tasdiqlash shart"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Parollar mos kelmadi",
    path: ["confirmPassword"],
  });

function SectionCard({ title, description, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
          <Icon size={18} />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <div className="pt-5">{children}</div>
    </div>
  );
}

export default function Settings() {
  const { user, logOut } = useAuth();
  const { showToast } = useToast();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    watch,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      avatar: user?.avatar || "",
    },
  });

  const avatarPreview = watch("avatar");

  const profileMutation = useMutation({
    mutationFn: (data) => api.put(`/users/${user.id}`, data),
    onSuccess: () => {
      showToast("Profil muvaffaqiyatli yangilandi ✅", "success");
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Profilni yangilab bo'lmadi ❌",
        "error"
      );
    },
  });

  function onProfileSubmit(data) {
    profileMutation.mutate(data);
  }

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const passwordMutation = useMutation({
    mutationFn: (data) =>
      api.put(`/users/${user.id}`, { password: data.newPassword }),
    onSuccess: () => {
      showToast("Parol muvaffaqiyatli o'zgartirildi ✅", "success");
      resetPasswordForm();
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Parolni o'zgartirib bo'lmadi ❌",
        "error"
      );
    },
  });

  function onPasswordSubmit(data) {
    passwordMutation.mutate(data);
  }

  function handleLogout() {
    logOut();
    setLogoutOpen(false);
  }

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-800">Sozlamalar</h1>
      <p className="mt-1 text-slate-500">
        Hisob ma'lumotlaringizni shu yerdan boshqaring.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Chap ustun */}
        <div className="space-y-6">
          <SectionCard
            title="Profil ma'lumotlari"
            description="Ismingiz va avatar rasmingizni yangilang."
            icon={User}
          >
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={avatarPreview || user?.avatar || FALLBACK_AVATAR}
                  alt="Avatar"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-slate-100"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_AVATAR;
                  }}
                />
                <div className="flex-1 space-y-1.5">
                  <label className="text-xs font-medium text-slate-600">
                    Avatar URL
                  </label>
                  <div className="relative">
                    <Image
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="https://example.com/avatar.jpg"
                      {...registerProfile("avatar")}
                      className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                  {profileErrors.avatar && (
                    <p className="text-xs text-red-500">{profileErrors.avatar.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  To'liq ism
                </label>
                <div className="relative mt-1.5">
                  <User
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Ism-familiya"
                    {...registerProfile("name")}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                {profileErrors.name && (
                  <p className="mt-1 text-xs text-red-500">{profileErrors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">Email</label>
                <div className="relative mt-1.5">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={user?.email || ""}
                    disabled
                    className="h-11 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-400"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Email manzilni o'zgartirib bo'lmaydi.
                </p>
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-4">
                <button
                  type="submit"
                  disabled={profileMutation.isPending}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={16} />
                  {profileMutation.isPending ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </SectionCard>
        </div>

        {/* O'ng ustun */}
        <div className="space-y-6">
          <SectionCard
            title="Parolni o'zgartirish"
            description="Hisobingiz xavfsizligi uchun yangi parol o'rnating."
            icon={Lock}
          >
            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Yangi parol
                </label>
                <div className="relative mt-1.5">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    placeholder="Yangi parol"
                    {...registerPassword("newPassword")}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Parolni tasdiqlash
                </label>
                <div className="relative mt-1.5">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    placeholder="Parolni qayta kiriting"
                    {...registerPassword("confirmPassword")}
                    className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end border-t border-slate-100 pt-4">
                <button
                  type="submit"
                  disabled={passwordMutation.isPending}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  <Save size={16} />
                  {passwordMutation.isPending ? "Saqlanmoqda..." : "Parolni yangilash"}
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard
            title="Hisob"
            description="Tizimdan chiqish yoki hisobingizni boshqarish."
            icon={ShieldAlert}
          >
            <button
              onClick={() => setLogoutOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={16} />
              Tizimdan chiqish
            </button>
          </SectionCard>
        </div>
      </div>

      <Modal
        IsOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Tizimdan chiqish"
      >
        <div className="p-6">
          <p className="font-semibold text-slate-800">
            Rostdan ham tizimdan chiqmoqchimisiz?
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Qayta kirish uchun login va parolingiz kerak bo'ladi.
          </p>

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={() => setLogoutOpen(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
            >
              Ha, chiqish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}