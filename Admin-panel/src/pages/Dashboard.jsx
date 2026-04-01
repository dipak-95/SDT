import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

/* ─────────────────────────────────────────────
   STAT CARD — shows inquiry total + confirmed
───────────────────────────────────────────── */
const StatCard = ({ title, total, confirmed, icon, color = "#f4612b" }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{icon}</span>
      {confirmed !== undefined && (
        <span className="text-[10px] font-bold bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
          ✔ {confirmed} Confirmed
        </span>
      )}
    </div>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
    <p className="text-4xl font-black" style={{ color }}>{total}</p>
    <p className="text-[10px] text-gray-400 mt-1">Total Inquiries</p>
  </div>
);

/* ─────────────────────────────────────────────
   REVENUE CARD
───────────────────────────────────────────── */
const RevenueCard = ({ totalRevenue }) => (
  <div className="bg-gradient-to-br from-[#f4612b] to-[#e04e1a] text-white p-5 rounded-2xl shadow-md">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-2xl">💰</span>
      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Confirmed Only</span>
    </div>
    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Revenue</p>
    <p className="text-4xl font-black">₹{Number(totalRevenue).toLocaleString("en-IN")}</p>
    <p className="text-[10px] opacity-70 mt-1">From all confirmed bookings</p>
  </div>
);

/* ─────────────────────────────────────────────
   REVENUE CHART
───────────────────────────────────────────── */
const RevenueChart = ({ data }) => (
  <div className="bg-white mt-8 p-6 rounded-2xl shadow-sm border border-gray-100">
    <h2 className="text-base font-bold text-gray-700 mb-4">Monthly Revenue (Confirmed)</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#f4612b"
          strokeWidth={3}
          dot={{ r: 5, fill: "#f4612b" }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */
const Dashboard = () => {
  const location = useLocation();

  const [stats, setStats] = useState({
    // inquiry counts
    groupInquiries:      0,
    individualInquiries: 0,
    hotelInquiries:      0,
    carInquiries:        0,
    // confirmed counts
    groupBookings:       0,
    individualBookings:  0,
    hotelBookings:       0,
    carBookings:         0,
    // revenue
    totalRevenue:        0,
    monthlyRevenue:      [],
  });

  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://api.sdtour.online/Dashboard/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, [location.pathname]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#f4612b] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f9f9f9] min-h-screen">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-[#f4612b]">Admin Dashboard</h1>
        <button
          onClick={fetchStats}
          className="text-xs font-bold text-[#f4612b] border border-[#f4612b] px-4 py-1.5 rounded-full hover:bg-[#f4612b] hover:text-white transition-all"
        >
          🔄 Refresh
        </button>
      </div>

      {/* ── INQUIRY CARDS ── */}
      <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
        📋 All Inquiries (Pending + Confirmed)
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Group Tour"
          total={stats.groupInquiries}
          confirmed={stats.groupBookings}
          icon="🚌"
        />
        <StatCard
          title="Individual Tour"
          total={stats.individualInquiries}
          confirmed={stats.individualBookings}
          icon="🧳"
        />
        <StatCard
          title="Hotel Inquiries"
          total={stats.hotelInquiries}
          confirmed={stats.hotelBookings}
          icon="🏨"
        />
        <StatCard
          title="Car Inquiries"
          total={stats.carInquiries}
          confirmed={stats.carBookings}
          icon="🚗"
        />
      </div>

      {/* ── REVENUE CARD ── */}
      <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
        💰 Revenue Summary
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        <RevenueCard totalRevenue={stats.totalRevenue} />

        {/* Quick Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Confirmed Bookings</p>
          <div className="space-y-3">
            {[
              { label: "Group Tours",      val: stats.groupBookings,      icon: "🚌" },
              { label: "Individual Tours", val: stats.individualBookings, icon: "🧳" },
              { label: "Hotels",           val: stats.hotelBookings,       icon: "🏨" },
              { label: "Car Rentals",      val: stats.carBookings,         icon: "🚗" },
            ].map(({ label, val, icon }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <span>{icon}</span>{label}
                </span>
                <span className="font-black text-[#f4612b] text-lg">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MONTHLY REVENUE CHART ── */}
      <RevenueChart data={stats.monthlyRevenue} />
    </div>
  );
};

export default Dashboard;
