function StatCard({ title, value, description, icon: Icon, color }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          <p className="mt-1 text-sm text-gray-400">{description}</p>
        </div>

        <div className={`rounded-full p-3 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;