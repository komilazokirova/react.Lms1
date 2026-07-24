
import { Clock, MapPin } from "lucide-react";
import { lessons } from "../../constant/data/Lessons";

function UpcomingLessons() {
  return (
    <div className="rounded-xl bg-white p-6 max-h-[500px] overflow-y-auto shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">Upcoming Lessons</h2>

      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="rounded-lg border p-4">
            <p className="text-lg font-semibold">{lesson.title}</p>

            <p className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <Clock size={14} />
              {lesson.time}
            </p>

            <p className="flex items-center gap-1 text-sm text-gray-400 mt-1">
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