const TourBooking = require("../model/BookingSchema");
const CarBooking  = require("../model/CarBooking");

module.exports.getDashboardStats = async (req, res) => {
  try {

    /* ================= INQUIRY COUNTS (ALL â€” pending + confirmed + cancelled) ================= */

    // Group Tour â€” all inquiries
    const groupInquiries = await TourBooking.countDocuments({
      tourType: { $regex: /^group$/i },
    });

    // Individual Tour â€” all inquiries
    const individualInquiries = await TourBooking.countDocuments({
      tourType: { $regex: /^individual$/i },
    });

    // Hotel â€” all inquiries
    // Car â€” all inquiries
    const carInquiries = await CarBooking.countDocuments({});

    /* ================= CONFIRMED COUNTS (for reference) ================= */

    const groupConfirmed      = await TourBooking.countDocuments({ tourType: { $regex: /^group$/i },      status: { $regex: /^confirmed$/i } });
    const individualConfirmed = await TourBooking.countDocuments({ tourType: { $regex: /^individual$/i }, status: { $regex: /^confirmed$/i } });
    const carConfirmed        = await CarBooking.countDocuments({ status: { $regex: /^confirmed$/i } });

    /* ================= TOTAL REVENUE (only confirmed) ================= */

    const tourRevAgg = await TourBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $cond: {
                if: { $gt: ["$payableAmount", 0] },
                then: "$payableAmount",
                else: "$totalAmount"
              }
            }
          }
        }
      },
    ]);
    const carRevAgg = await CarBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    const totalRevenue =
      (tourRevAgg[0]?.total  || 0) +
      (carRevAgg[0]?.total   || 0);

    /* ================= MONTHLY REVENUE (confirmed only) ================= */

    const carMonthly = await CarBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$total" },
        },
      },
    ]);

    const tourMonthly = await TourBooking.aggregate([
      { $match: { status: { $regex: /^confirmed$/i } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: {
            $sum: {
              $cond: {
                if: { $gt: ["$payableAmount", 0] },
                then: "$payableAmount",
                else: "$totalAmount"
              }
            }
          },
        },
      },
    ]);

    const monthlyMap = {};
    const mergeMonthly = (results) => {
      results.forEach((item) => {
        monthlyMap[item._id] = (monthlyMap[item._id] || 0) + item.revenue;
      });
    };
    mergeMonthly(tourMonthly);
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
      // â”€â”€ Inquiry counts (ALL bookings regardless of status) â”€â”€
      groupInquiries,
      individualInquiries,
      hotelInquiries: 0,
      carInquiries,

      // â”€â”€ Confirmed counts â”€â”€
      groupBookings:      groupConfirmed,
      individualBookings: individualConfirmed,
      hotelBookings: 0,
      carBookings:        carConfirmed,

      // â”€â”€ Revenue (confirmed only) â”€â”€
      totalRevenue,
      monthlyRevenue,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Dashboard fetch failed", error: error.message });
  }
};

