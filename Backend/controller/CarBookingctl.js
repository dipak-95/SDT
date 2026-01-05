const CarBooking = require("../model/CarBooking");

/* ================= USER – CREATE BOOKING ================= */
exports.createCarBooking = async (req, res) => {
  try {
    const booking = await CarBooking.create(req.body);
    res.status(201).json({
      msg: "Car booking created successfully",
      booking
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= ADMIN – GET ALL BOOKINGS ================= */
exports.getAllCarBookings = async (req, res) => {
  try {
    const data = await CarBooking.find()
      .populate("carId", "name type seats pricePerKm")
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= ADMIN – UPDATE STATUS ================= */
exports.updateCarBookingStatus = async (req, res) => {
  try {
    await CarBooking.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    });
    res.json({ msg: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ================= ADMIN – DELETE ================= */
exports.deleteCarBooking = async (req, res) => {
  try {
    await CarBooking.findByIdAndDelete(req.params.id);
    res.json({ msg: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
