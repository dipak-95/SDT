const TourBooking = require("../model/BookingSchema");
const HotelBooking = require("../model/HotelBooking");
const CarBooking = require("../model/CarBooking");

module.exports.getDashboardStats = async (req, res) => {
  try {
    /* ================= COUNTS ================= */

    const groupBookings = await TourBooking.countDocuments({
      tourType: { $regex: /^group$/i },
      status: { $regex: /^confirmed$/i },
    });

    const individualBookings = await TourBooking.countDocuments({
      tourType: { $regex: /^individual$/i },
      status: { $regex: /^confirmed$/i },
    });

    const hotelBookingsCount = await HotelBooking.countDocuments({
      status: { $regex: /^confirmed$/i },
    });

    const carBookingsCount = await CarBooking.countDocuments({
      status: { $regex: /^confirmed$/i },
    });

    const carEnquiries = await CarBooking.countDocuments({
      status: { $regex: /^pending$/i },
    });
    
    const hotelEnquiries = await HotelBooking.countDocuments({
      status: { $regex: /^pending$/i },
    });

    /* ================= TOTAL REVENUE ================= */

    // 1. Tour Revenue
    const tourRevAgg = await TourBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // 2. Hotel Revenue
    const hotelRevAgg = await HotelBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // 3. Car Revenue
    const carRevAgg = await CarBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue = (tourRevAgg[0]?.total || 0) + 
                         (hotelRevAgg[0]?.total || 0) + 
                         (carRevAgg[0]?.total || 0);

    /* ================= MONTHLY REVENUE (Combined) ================= */
    
    const fetchMonthly = async (Model, amountField) => {
      return await Model.aggregate([
        { $match: { status: { $regex: /^confirmed$/i } } },
        { $group: { _id: { $month: "$createdAt" }, revenue: { $sum: `$${amountField}` } } }
      ]);
    };

    const [tourMonthly, hotelMonthly, carMonthly] = await Promise.all([
      fetchMonthly(TourBooking, "totalAmount"),
      fetchMonthly(HotelBooking, "totalAmount"),
      fetchMonthly(CarBooking, "total")
    ]);

    const monthlyMap = {};
    const mergeMonthly = (results) => {
      results.forEach(item => {
        monthlyMap[item._id] = (monthlyMap[item._id] || 0) + item.revenue;
      });
    };

    mergeMonthly(tourMonthly);
    mergeMonthly(hotelMonthly);
    mergeMonthly(carMonthly);

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthlyRevenue = Object.keys(monthlyMap).map(mIdx => ({
      month: monthNames[parseInt(mIdx) - 1],
      revenue: monthlyMap[mIdx],
    })).sort((a, b) => monthNames.indexOf(a.month) - monthNames.indexOf(b.month));

    /* ================= RESPONSE ================= */

    res.status(200).json({
      groupBookings,
      individualBookings,
      hotelBookings: hotelBookingsCount,
      carBookings: carBookingsCount,
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
