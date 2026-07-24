import { activities } from "../../constant/data/activities";


function RecentActivity() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <span className="text-xs text-gray-400">{activities.length} events</span>
      </div>

      <div className="max-h-[365px] space-y-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-track]:bg-transparent">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className={`flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50 ${
                index !== activities.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${activity.color}`}
              >
                <Icon size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-medium text-gray-800">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;