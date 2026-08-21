import { activities } from "../../constant/data/activities";


function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Recent activity</h2>
        <span className="text-xs font-medium text-slate-400">{activities.length} events</span>
      </div>

      <div className="max-h-[365px] space-y-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className={`flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50 ${
                index !== activities.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${activity.color}`}
              >
                <Icon size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {activity.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;
