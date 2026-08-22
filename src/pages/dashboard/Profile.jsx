import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const FALLBACK_AVATAR = "https://i.pravatar.cc/300?img=12";

function formatDate(value) {
  if (!value) return "Ma'lumot yo'q";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Ma'lumot yo'q";

  return new Intl.DateTimeFormat("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon size={19} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-400">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const fullName = user?.name || "Foydalanuvchi";
  const role = user?.role || "Talaba";

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-800">Profil</h1>
      <p className="mt-1 text-slate-500">
        Hisobingiz haqidagi ma'lumotlar shu yerda.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Chap ustun — asosiy ma'lumotlar */}
        <div className="space-y-6 lg:col-span-2">
          {/* Profile card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar || FALLBACK_AVATAR}
                alt={`${fullName} avatari`}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-slate-100"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_AVATAR;
                }}
              />
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-slate-800">
                  {fullName}
                </h2>
                <p className="truncate text-sm text-slate-500">
                  {user?.email || "Email kiritilmagan"}
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Faol
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-slate-700">
              Shaxsiy ma'lumotlar
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailCard icon={UserRound} label="To'liq ism" value={fullName} />
              <DetailCard icon={Mail} label="Email manzil" value={user?.email || "Email kiritilmagan"} />
              <DetailCard icon={ShieldCheck} label="Hisob roli" value={role} />
              <DetailCard icon={CalendarDays} label="Ro'yxatdan o'tgan" value={formatDate(user?.creationAt)} />
            </div>
          </div>
        </div>

        {/* O'ng ustun — CTA */}
        <div className="space-y-6">
          <Link
            to="/my-learning"
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <GraduationCap size={21} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Mening ta'limim
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Kurslaringiz va o'zlashtirish darajangizni ko'rib chiqing.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600">
              <BookOpen size={16} /> Ochish
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}