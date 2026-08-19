import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Search,
  Trophy,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

// =====================================================
// 1. ZOD SCHEMA
// =====================================================

const courseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  category: z.string(),
  instructor: z.string(),
  lessons: z.number(),
  duration: z.string(),
  progress: z.number().min(0).max(100),
});

const coursesSchema = z.array(courseSchema);

// =====================================================
// 2. API
// =====================================================

const API_URL = "https://dummyjson.com/products?limit=12";

const fetchMyLearning = async () => {
  const response = await axios.get(API_URL);

  const products = response.data.products;

  const courses = products.map((product, index) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    image: product.thumbnail,
    category: product.category,
    instructor: [
      "John Smith",
      "Sarah Wilson",
      "Michael Brown",
      "Emily Davis",
    ][index % 4],
    lessons: 12 + (index % 8) * 3,
    duration: `${2 + (index % 5)}h ${15 + index}m`,
    progress: [100, 75, 45, 20, 90, 60, 35, 100, 15, 80, 50, 65][index],
  }));

  // API'dan kelgan ma'lumotni Zod bilan tekshiramiz
  return coursesSchema.parse(courses);
};

// =====================================================
// 3. SKELETON
// =====================================================

const CourseSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-52 animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

        <div className="h-2 animate-pulse rounded bg-gray-200" />

        <div className="h-11 animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

// =====================================================
// 4. COURSE CARD
// =====================================================

const CourseCard = ({ course }) => {
  const isCompleted = course.progress === 100;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* CATEGORY */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold capitalize text-gray-800 shadow-sm backdrop-blur">
          {course.category}
        </div>

        {/* PROGRESS */}
        <div className="absolute right-4 top-4 rounded-full bg-gray-900/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {course.progress}%
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold text-gray-900">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {course.description}
        </p>

        {/* INSTRUCTOR */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <GraduationCap size={16} className="text-blue-600" />
          </div>

          <span className="text-sm font-medium text-gray-600">
            {course.instructor}
          </span>
        </div>

        {/* INFO */}
        <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} />
            {course.lessons} lessons
          </div>

          <div className="flex items-center gap-1.5">
            <Clock3 size={16} />
            {course.duration}
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              Course progress
            </span>

            <span className="text-xs font-bold text-blue-600">
              {course.progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isCompleted ? "bg-green-500" : "bg-blue-600"
              }`}
              style={{
                width: `${course.progress}%`,
              }}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition ${
            isCompleted
              ? "bg-green-50 text-green-600 hover:bg-green-100"
              : "bg-gray-900 text-white hover:bg-blue-600"
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={18} />
              Completed
            </>
          ) : (
            <>
              <PlayCircle size={18} />
              Continue Learning
              <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// =====================================================
// 5. MAIN COMPONENT
// =====================================================

const MyLearning = () => {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  // ===================================================
  // TANSTACK QUERY
  // ===================================================

  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["my-learning"],
    queryFn: fetchMyLearning,
  });

  // ===================================================
  // SEARCH + FILTER
  // ===================================================

  const filteredCourses = React.useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "progress" &&
          course.progress > 0 &&
          course.progress < 100) ||
        (filter === "completed" && course.progress === 100);

      return matchesSearch && matchesFilter;
    });
  }, [courses, search, filter]);

  // ===================================================
  // STATISTICS
  // ===================================================

  const completedCourses = courses.filter(
    (course) => course.progress === 100
  ).length;

  const inProgressCourses = courses.filter(
    (course) => course.progress > 0 && course.progress < 100
  ).length;

  const totalProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (sum, course) => sum + course.progress,
            0
          ) / courses.length
        )
      : 0;

  // ===================================================
  // UI
  // ===================================================

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =============================================
            HEADER
        ============================================== */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-blue-600">
              <BookOpen size={22} />

              <span className="font-semibold">
                Learning Dashboard
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Learning
            </h1>

            <p className="mt-2 max-w-xl text-gray-500">
              O‘zingiz yozilgan kurslarni kuzating, progressni
              ko‘ring va o‘qishni davom ettiring.
            </p>
          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:w-80">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        {/* =============================================
            STATISTICS
        ============================================== */}

        {!isLoading && !isError && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* TOTAL */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-blue-50 p-3">
                  <BookOpen className="text-blue-600" size={22} />
                </div>

                <span className="text-xs font-semibold text-gray-400">
                  TOTAL
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-gray-900">
                {courses.length}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Enrolled courses
              </p>
            </div>

            {/* IN PROGRESS */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-orange-50 p-3">
                  <TrendingUp
                    className="text-orange-500"
                    size={22}
                  />
                </div>

                <span className="text-xs font-semibold text-gray-400">
                  ACTIVE
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-gray-900">
                {inProgressCourses}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                In progress
              </p>
            </div>

            {/* COMPLETED */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-green-50 p-3">
                  <Trophy className="text-green-600" size={22} />
                </div>

                <span className="text-xs font-semibold text-gray-400">
                  DONE
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-gray-900">
                {completedCourses}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Completed
              </p>
            </div>

            {/* OVERALL PROGRESS */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-purple-50 p-3">
                  <GraduationCap
                    className="text-purple-600"
                    size={22}
                  />
                </div>

                <span className="text-xs font-semibold text-gray-400">
                  OVERALL
                </span>
              </div>

              <p className="mt-4 text-3xl font-bold text-gray-900">
                {totalProgress}%
              </p>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-purple-600"
                  style={{
                    width: `${totalProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* =============================================
            FILTERS
        ============================================== */}

        {!isLoading && !isError && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                ["all", "All Courses"],
                ["progress", "In Progress"],
                ["completed", "Completed"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    filter === value
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {isFetching && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <RotateCcw size={15} className="animate-spin" />
                Updating...
              </div>
            )}
          </div>
        )}

        {/* =============================================
            LOADING
        ============================================== */}

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <CourseSkeleton key={item} />
            ))}
          </div>
        )}

        {/* =============================================
            ERROR
        ============================================== */}

        {isError && (
          <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <RotateCcw
                size={28}
                className="text-red-500"
              />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Something went wrong
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {error?.message ||
                "Courses could not be loaded."}
            </p>

            <button
              onClick={() => refetch()}
              className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* =============================================
            EMPTY
        ============================================== */}

        {!isLoading &&
          !isError &&
          filteredCourses.length === 0 && (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Search
                  size={28}
                  className="text-gray-400"
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No courses found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Search yoki filter bo‘yicha kurs topilmadi.
              </p>
            </div>
          )}

        {/* =============================================
            COURSE GRID
        ============================================== */}

        {!isLoading &&
          !isError &&
          filteredCourses.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                />
              ))}
            </div>
          )}
      </div>
    </main>
  );
};

export default MyLearning;