
import { stats } from "../../constant/data/Stats";
import StatCard from "./StatCard";

function StatsGrid() {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StatCard
          key={item.id}
          title={item.title}
          value={item.value}
          description={item.description}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}

export default StatsGrid;