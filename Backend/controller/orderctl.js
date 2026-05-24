const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../model/Dashboard");
const Booking = require("../model/BookingSchema");

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder";
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

module.exports.createOrder = async (req, res) => {
  try {
    const { amount, serviceType } = req.body;
    
    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required" });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const order = await Order.create({
      serviceType: serviceType || "group",
      status: "pending",
      amount: Number(amount),
    });

    res.status(201).json({
      success: true,
      keyId: razorpayKeyId,
      order: razorpayOrder,
      dbOrder: order
    });

  } catch (error) {
    console.error("❌ RAZORPAY ORDER CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create Razorpay order",
    });
  }
};

module.exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
      carBookingId
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {

      // ===== TOUR BOOKING =====
      if (bookingId) {
        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          { status: "confirmed" },
          { new: true }
        );

        if (booking && booking.tourType && booking.tourType.toLowerCase() === "group" && booking.tourId) {
          const GroupTour = require("../model/GroupTourShema");
          const tour = await GroupTour.findById(booking.tourId);

          if (tour) {
            // Sync seats array
            const total = tour.totalSeats || 49;
            if (!tour.seats || tour.seats.length === 0) {
              tour.seats = [];
              for (let i = 1; i <= total; i++) {
                tour.seats.push({ seatNumber: i, status: "available", bookingName: "", phone: "" });
              }
            }
            while (tour.seats.length < total) {
              tour.seats.push({ seatNumber: tour.seats.length + 1, status: "available", bookingName: "", phone: "" });
            }
            if (tour.seats.length > total) tour.seats = tour.seats.slice(0, total);

            // If customer selected specific seats, assign those
            const selectedSeats = booking.selectedSeats || [];
            if (selectedSeats.length > 0) {
              for (const seatNum of selectedSeats) {
                const seat = tour.seats.find(s => s.seatNumber === seatNum);
                if (seat && seat.status === "available") {
                  seat.status = "booked_online";
                  seat.bookingName = booking.userName || "Online Booking";
                  seat.phone = booking.phone || "";
                  seat.bookingId = booking._id;
                }
              }
            } else {
              // fallback: assign first N available seats
              let assigned = 0;
              const toAssign = booking.persons || 0;
              for (let i = 0; i < tour.seats.length; i++) {
                if (tour.seats[i].status === "available") {
                  tour.seats[i].status = "booked_online";
                  tour.seats[i].bookingName = booking.userName || "Online Booking";
                  tour.seats[i].phone = booking.phone || "";
                  tour.seats[i].bookingId = booking._id;
                  assigned++;
                  if (assigned >= toAssign) break;
                }
              }
            }

            tour.bookedSeats = tour.seats.filter(s => s.status !== "available").length;
            await tour.save();
            console.log(`✅ Seats assigned for Group Tour ${booking.tourId}, bookedSeats=${tour.bookedSeats}`);
          }
        }
      }

      // ===== CAR BOOKING =====
      if (carBookingId) {
        const CarBooking = require("../model/CarBooking");
        await CarBooking.findByIdAndUpdate(carBookingId, { status: "confirmed" });
        console.log(`✅ Car booking ${carBookingId} confirmed`);
      }

      return res.status(200).json({
        success: true,
        message: "Payment verified and booking confirmed successfully!"
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature verification failed."
      });
    }
  } catch (error) {
    console.error("❌ RAZORPAY VERIFY ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Payment verification failed"
    });
  }
};
