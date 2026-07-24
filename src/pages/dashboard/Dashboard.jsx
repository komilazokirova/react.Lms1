import React from "react";
import { useAuth } from "../../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import StatsGrid from "../../components/dashboard/StatsGrid";
import UpcomingLessons from "../../components/dashboard/UpcomingLessons";
import RecentActivity from "../../components/dashboard/RecentActivity";
import WelcomeSection from "../../components/dashboard/WelcomeSection";

const Dashboard = () => {
  const { logOut, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
      <WelcomeSection/>
      <StatsGrid />

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UpcomingLessons />
        </div>

        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;