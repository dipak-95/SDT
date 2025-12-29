const Booking = require("../model/BookingSchema");

/* CREATE BOOKING (already used by user) */
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* 🔥 ADMIN – GET ALL BOOKINGS */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 }); // latest first

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* OPTIONAL – UPDATE STATUS */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* DELETE BOOKING (ADMIN) */

exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    res.status(200).json({ msg: "Booking deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

