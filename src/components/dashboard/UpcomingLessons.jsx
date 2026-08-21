
import { Clock, MapPin } from "lucide-react";
import { lessons } from "../../constant/data/Lessons";

function UpcomingLessons() {
  return (
    <div className="max-h-[500px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-900">Upcoming lessons</h2><span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">This week</span></div>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="rounded-xl border border-slate-100 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/30">
            <p className="text-base font-semibold text-slate-800">{lesson.title}</p>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <Clock size={14} />
              {lesson.time}
            </p>

            <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
              <MapPin size={14} />
              {lesson.room}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingLessons;
