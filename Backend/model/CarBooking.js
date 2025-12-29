const mongoose = require("mongoose");

const carBookingSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    phone: String,

    vehicleName: String,
    vehicleType: String,
    pricePerKm: Number,
    seats: Number,
    persons: Number,

    note: String,

    status: {
      type: String,
      default: "pending", // pending | confirmed | cancelled
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarBooking", carBookingSchema);
