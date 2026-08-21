import { useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock3, GraduationCap, Search, Sparkles, Users, RotateCcw, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "https://dummyjson.com/products?limit=24";
const FALLBACK_IMAGE = "https://placehold.co/800x450/e0e7ff/3730a3?text=Kurs";
const instructors = ["Dilshod Karimov", "Madina Abdullayeva", "Jasur Rahimov", "Aziza Ismoilova"];

async function fetchCourses() {
  const { data } = await axios.get(API_URL);
  return data.products.map((course, index) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    image: course.thumbnail,
    category: course.category,
    instructor: instructors[index % instructors.length],
    lessons: 12 + (index % 8) * 3,
    duration: `${2 + (index % 5)} soat ${15 + index} daqiqa`,
    students: 180 + index * 47,
  }));
}

function CourseSkeleton() {
  return <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"><div className="h-48 animate-pulse bg-slate-200" /><div className="space-y-4 p-5"><div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" /><div className="h-4 w-full animate-pulse rounded bg-slate-100" /><div className="h-10 animate-pulse rounded-xl bg-slate-200" /></div></div>;
}

function CourseCard({ course }) {
  return <article className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="relative h-48 overflow-hidden bg-indigo-100">
      <img src={course.image} alt={course.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = FALLBACK_IMAGE; }} />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold capitalize text-slate-700 shadow-sm">{course.category}</span>
    </div>
    <div className="p-5">
      <h2 className="min-h-[56px] line-clamp-2 text-lg font-bold leading-7 text-slate-900">{course.title}</h2>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{course.description}</p>
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-600"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600"><GraduationCap size={16} /></span>{course.instructor}</div>
      <div className="mt-4 flex items-center justify-between border-y border-slate-100 py-3 text-xs font-medium text-slate-500"><span className="flex items-center gap-1.5"><BookOpen size={15} /> {course.lessons} ta dars</span><span className="flex items-center gap-1.5"><Clock3 size={15} /> {course.duration}</span></div>
      <Link to={`/courses/${course.id}`} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100">Kursni ko'rish <ArrowRight size={17} /></Link>
    </div>
  </article>;
}

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const { data: courses = [], isLoading, isError, error, refetch } = useQuery({ queryKey: ["courses-catalog"], queryFn: fetchCourses });
  const categories = useMemo(() => ["all", ...new Set(courses.map((course) => course.category))], [courses]);
  const filteredCourses = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return courses.filter((course) => {
      const matchesSearch = !term || [course.title, course.description, course.category, course.instructor].some((value) => value.toLocaleLowerCase().includes(term));
      return matchesSearch && (category === "all" || course.category === category);
    });
  }, [category, courses, search]);

  return <main className="min-h-full bg-gradient-to-b from-indigo-50/70 via-slate-50 to-white px-4 py-7 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl">
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" /><div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" /><div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="flex items-center gap-2 text-sm font-semibold text-indigo-200"><Sparkles size={17} /> O'zingiz uchun yangi imkoniyat</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Barcha kurslar</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">Bilimingizni oshirish uchun o'zingizga mos kursni tanlang va o'qishni bugundan boshlang.</p></div><div className="relative w-full lg:w-80"><Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Kurs yoki kategoriya..." aria-label="Kurslarni qidirish" className="w-full rounded-xl border border-white/10 bg-white px-11 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-400/40" /></div></div></section>
    {!isLoading && !isError && <section className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-2" role="tablist" aria-label="Kurs kategoriyalari">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition focus:outline-none focus:ring-4 focus:ring-indigo-100 ${category === item ? "bg-indigo-600 text-white shadow-sm" : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"}`}>{item === "all" ? "Barchasi" : item}</button>)}</div><p className="flex items-center gap-2 text-sm font-medium text-slate-500"><Users size={16} /> {filteredCourses.length} ta kurs</p></section>}
    {isLoading && <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <CourseSkeleton key={index} />)}</section>}
    {isError && <section className="mx-auto mt-8 max-w-xl rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-600"><RotateCcw size={25} /></span><h2 className="mt-5 text-xl font-bold text-slate-900">Kurslarni yuklab bo'lmadi</h2><p className="mt-2 text-sm text-slate-500">{error?.message || "Internet aloqangizni tekshirib, qayta urinib ko'ring."}</p><button type="button" onClick={() => refetch()} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-600"><RotateCcw size={16} /> Qayta urinish</button></section>}
    {!isLoading && !isError && filteredCourses.length === 0 && <section className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><Search size={28} className="mx-auto text-slate-400" /><h2 className="mt-5 text-xl font-bold text-slate-900">Kurs topilmadi</h2><p className="mt-2 text-sm text-slate-500">Qidiruv so'zini yoki kategoriyani o'zgartirib ko'ring.</p><button type="button" onClick={() => { setSearch(""); setCategory("all"); }} className="mt-5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">Filtrlarni tozalash</button></section>}
    {!isLoading && !isError && filteredCourses.length > 0 && <section className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}</section>}
  </div></main>;
}
