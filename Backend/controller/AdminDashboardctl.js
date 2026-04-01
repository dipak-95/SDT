const TourBooking = require("../model/BookingSchema");
const HotelBooking = require("../model/HotelBooking");
const CarBooking  = require("../model/CarBooking");

module.exports.getDashboardStats = async (req, res) => {
  try {

    /* ================= INQUIRY COUNTS (ALL — pending + confirmed + cancelled) ================= */

    // Group Tour — all inquiries
    const groupInquiries = await TourBooking.countDocuments({
      tourType: { $regex: /^group$/i },
    });

    // Individual Tour — all inquiries
    const individualInquiries = await TourBooking.countDocuments({
      tourType: { $regex: /^individual$/i },
    });

    // Hotel — all inquiries
    const hotelInquiries = await HotelBooking.countDocuments({});

    // Car — all inquiries
    const carInquiries = await CarBooking.countDocuments({});

    /* ================= CONFIRMED COUNTS (for reference) ================= */

    const groupConfirmed      = await TourBooking.countDocuments({ tourType: { $regex: /^group$/i },      status: { $regex: /^confirmed$/i } });
    const individualConfirmed = await TourBooking.countDocuments({ tourType: { $regex: /^individual$/i }, status: { $regex: /^confirmed$/i } });
    const hotelConfirmed      = await HotelBooking.countDocuments({ status: { $regex: /^confirmed$/i } });
    const carConfirmed        = await CarBooking.countDocuments({ status: { $regex: /^confirmed$/i } });

    /* ================= TOTAL REVENUE (only confirmed) ================= */

    const tourRevAgg = await TourBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const hotelRevAgg = await HotelBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const carRevAgg = await CarBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue =
      (tourRevAgg[0]?.total  || 0) +
      (hotelRevAgg[0]?.total || 0) +
      (carRevAgg[0]?.total   || 0);

    /* ================= MONTHLY REVENUE (confirmed only) ================= */

    const fetchMonthly = async (Model, amountField) => {
      return await Model.aggregate([
        { $match: { status: { $regex: /^confirmed$/i } } },
        {
          $group: {
            _id: { $month: "$createdAt" },
            revenue: { $sum: `$${amountField}` },
          },
        },
      ]);
    };

    const [tourMonthly, hotelMonthly, carMonthly] = await Promise.all([
      fetchMonthly(TourBooking, "totalAmount"),
      fetchMonthly(HotelBooking, "totalAmount"),
      fetchMonthly(CarBooking,   "total"),
    ]);

    const monthlyMap = {};
    const mergeMonthly = (results) => {
      results.forEach((item) => {
        monthlyMap[item._id] = (monthlyMap[item._id] || 0) + item.revenue;
      });
    };
    mergeMonthly(tourMonthly);
    mergeMonthly(hotelMonthly);
    mergeMonthly(carMonthly);

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthlyRevenue = Object.keys(monthlyMap)
      .map((mIdx) => ({
        month:   monthNames[parseInt(mIdx) - 1],
        revenue: monthlyMap[mIdx],
      }))
      .sort((a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month));

    /* ================= RESPONSE ================= */

    res.status(200).json({
      // ── Inquiry counts (ALL bookings regardless of status) ──
      groupInquiries,
      individualInquiries,
      hotelInquiries,
      carInquiries,

      // ── Confirmed counts ──
      groupBookings:      groupConfirmed,
      individualBookings: individualConfirmed,
      hotelBookings:      hotelConfirmed,
      carBookings:        carConfirmed,

      // ── Revenue (confirmed only) ──
      totalRevenue,
      monthlyRevenue,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Dashboard fetch failed", error: error.message });
  }
};
