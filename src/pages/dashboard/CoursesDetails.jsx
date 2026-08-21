import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, GraduationCap, PlayCircle, RotateCcw, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const FALLBACK_IMAGE = "https://placehold.co/1000x600/e0e7ff/3730a3?text=Kurs";

async function fetchCourse(id) {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
}

export default function CoursesDetails() {
  const { id } = useParams();
  const { data: course, isLoading, isError, error, refetch } = useQuery({ queryKey: ["course", id], queryFn: () => fetchCourse(id), enabled: Boolean(id) });

  if (isLoading) return <div className="flex min-h-[500px] items-center justify-center text-sm font-semibold text-slate-500">Kurs yuklanmoqda...</div>;
  if (isError) return <section className="mx-auto mt-10 max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm"><RotateCcw size={28} className="mx-auto text-rose-500" /><h1 className="mt-4 text-xl font-bold text-slate-900">Kursni yuklab bo'lmadi</h1><p className="mt-2 text-sm text-slate-500">{error?.message || "Qayta urinib ko'ring."}</p><button type="button" onClick={() => refetch()} className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-600">Qayta urinish</button></section>;
  if (!course) return null;

  return <main className="min-h-full bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white px-4 py-7 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">
    <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-indigo-600"><ArrowLeft size={17} /> Kurslarga qaytish</Link>
    <section className="mt-5 overflow-hidden rounded-3xl bg-slate-950 shadow-xl"><div className="grid lg:grid-cols-[1.1fr_0.9fr]"><div className="relative min-h-[300px] bg-indigo-100"><img src={course.thumbnail || FALLBACK_IMAGE} alt={course.title} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = FALLBACK_IMAGE; }} /></div><div className="flex flex-col justify-center p-7 text-white sm:p-10"><span className="w-fit rounded-full bg-indigo-400/20 px-3 py-1.5 text-xs font-bold capitalize text-indigo-200">{course.category}</span><h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">{course.title}</h1><p className="mt-4 text-sm leading-6 text-slate-300">{course.description}</p><div className="mt-7 grid grid-cols-2 gap-3 text-sm text-slate-300"><span className="flex items-center gap-2"><BookOpen size={17} className="text-indigo-300" /> 24 ta dars</span><span className="flex items-center gap-2"><Clock3 size={17} className="text-indigo-300" /> 6 soat</span><span className="flex items-center gap-2"><Users size={17} className="text-indigo-300" /> 320 talaba</span><span className="flex items-center gap-2"><GraduationCap size={17} className="text-indigo-300" /> Sertifikat</span></div><Link to="/my-learning" className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-400"><PlayCircle size={19} /> O'qishni boshlash</Link></div></div></section>
    <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]"><article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-indigo-600">Kurs haqida</p><h2 className="mt-2 text-2xl font-black text-slate-900">Bu kursda nimalarni o'rganasiz?</h2><p className="mt-4 text-sm leading-7 text-slate-600">Amaliy mashg'ulotlar, tushunarli darslar va foydali topshiriqlar yordamida yangi ko'nikmalarni bosqichma-bosqich egallang.</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{["Asosiy tushunchalarni o'rganish", "Amaliy topshiriqlar bilan ishlash", "Bilimni mustahkamlash", "Yakuniy sertifikat olish"].map((item) => <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><CheckCircle2 size={18} className="shrink-0 text-emerald-500" />{item}</li>)}</ul></article><aside className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm"><p className="text-xs font-extrabold uppercase tracking-[0.15em] text-indigo-600">Kurs muallifi</p><div className="mt-5 flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white"><GraduationCap size={23} /></span><div><h2 className="font-bold text-slate-900">Tajribali mentor</h2><p className="text-sm text-slate-600">Professional o'qituvchi</p></div></div><div className="mt-6 border-t border-indigo-200 pt-5"><p className="text-sm text-slate-600">Kursga qo'shilish bepul va istalgan vaqtda boshlashingiz mumkin.</p></div></aside></section>
  </div></main>;
}
