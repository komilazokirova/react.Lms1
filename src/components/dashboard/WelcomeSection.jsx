import { useAuth } from "../../hook/useAuth";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function WelcomeSection() {

    const { user } = useAuth()
    return (
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg shadow-slate-200 sm:p-8">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="flex items-center gap-2 text-sm font-semibold text-indigo-200"><Sparkles size={16} /> Ta'lim markazi</p><h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Xush kelibsiz, {user?.name || "talaba"}!</h1><p className="mt-2 text-sm text-slate-300">Bugun o‘rganish uchun ajoyib kun. Kurslaringizni davom ettiring.</p></div>
              <Link to="/my-learning" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-indigo-100">Darslarga o‘tish <ArrowRight size={16} /></Link>
            </div>
        </div>
    )
}

export default WelcomeSection
