const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    /* ================= HOTEL INFO ================= */
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true
    },

    hotelName: {
      type: String,
      required: true
    },

    city: String,
    location: String,

    /* ================= ROOM INFO ================= */
    roomType: {
      type: String,
      enum: ["2-bed", "3-bed", "4-bed"],
      required: true
    },

    roomPrice: {
      type: Number,
      required: true
    },

    roomsBooked: {
      type: Number,
      required: true
    },

    nights: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    /* ================= DATE INFO ================= */
    checkIn: {
      type: Date,
      required: true
    },

    checkOut: {
      type: Date,
      required: true
    },

    /* ================= USER INFO ================= */
    user: {
      name: { type: String, required: true },
      email: String,
      phone: { type: String, required: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HotelBooking", bookingSchema);
