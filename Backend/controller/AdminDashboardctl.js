const Order = require("../model/Dashboard");

module.exports.getDashboardStats = async (req, res) => {
  try {
    /* ================= COUNTS ================= */

    const groupBookings = await Order.countDocuments({
      serviceType: { $regex: /^group$/i },
      status: { $regex: /^confirmed$/i },
    });

    const individualBookings = await Order.countDocuments({
      serviceType: { $regex: /^individual$/i },
      status: { $regex: /^confirmed$/i },
    });

    const hotelBookings = await Order.countDocuments({
      serviceType: { $regex: /^hotel$/i },
      status: { $regex: /^confirmed$/i },
    });

    const carBookings = await Order.countDocuments({
      serviceType: { $regex: /^car$/i },
      status: { $regex: /^confirmed$/i },
    });

    const carEnquiries = await Order.countDocuments({
      serviceType: { $regex: /^car$/i },
      status: { $regex: /^enquiry$/i },
    });

    /* ================= TOTAL REVENUE ================= */

    const revenueAgg = await Order.aggregate([
      {
        $match: {
          status: { $regex: /^confirmed$/i },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalRevenue = revenueAgg.length
      ? revenueAgg[0].total
      : 0;

    /* ================= MONTHLY REVENUE ================= */

    const monthlyAgg = await Order.aggregate([
      {
        $match: {
          status: { $regex: /^confirmed$/i },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthlyRevenue = monthlyAgg.map(item => ({
      month: monthNames[item._id - 1],
      revenue: item.revenue,
    }));

    /* ================= RESPONSE ================= */

    res.status(200).json({
      groupBookings,
      individualBookings,
      hotelBookings,
      carBookings,
      carEnquiries,
      totalRevenue,
      monthlyRevenue,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      message: "Dashboard fetch failed",
      error: error.message,
    });
  }
};
