import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value }) => (
  <div
    className="
      bg-white p-6 rounded-xl shadow
      hover:scale-105 transition-transform duration-300
    "
  >
    <h2 className="text-gray-500 text-sm">{title}</h2>
    <p className="text-3xl font-bold text-[#f4612b] mt-2">
      {value}
    </p>
  </div>
);

/* ================= REVENUE CHART ================= */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <div className="bg-white mt-10 p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Monthly Revenue
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#f4612b"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/* ================= DASHBOARD ================= */
const Dashboard = () => {
  const location = useLocation();

  const [stats, setStats] = useState({
    groupBookings: 0,
    individualBookings: 0,
    hotelBookings: 0,
    carBookings: 0,
    carEnquiries: 0,
    totalRevenue: 0,
    monthlyRevenue: [],
  });

  const [loading, setLoading] = useState(false);

  /* ---------- FETCH DASHBOARD STATS ---------- */
  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://sdt-7.onrender.com/Dashboard/dashboard-stats"
      );

      setStats(res.data);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [location.pathname]);

  return (
    <div className="p-6">
      {/* ===== PAGE TITLE ===== */}
      <h1 className="text-2xl font-bold text-[#f4612b] mb-6">
        Admin Dashboard
      </h1>

      {/* ===== STAT CARDS ===== */}
      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : (
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-3
            gap-4
          "
        >
          <StatCard
            title="Group Tour Bookings"
            value={stats.groupBookings}
          />

          <StatCard
            title="Individual Tour Bookings"
            value={stats.individualBookings}
          />

          <StatCard
            title="Hotel Bookings"
            value={stats.hotelBookings}
          />

          <StatCard
            title="Car Enquiries"
            value={stats.carBookings}
          />

        <StatCard
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
          />
        </div>
      )}

      {/* ===== MONTHLY REVENUE CHART ===== */}
      <RevenueChart data={stats.monthlyRevenue} />
    </div>
  );
};

export default Dashboard;
