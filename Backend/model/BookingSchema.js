// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    phone: String,

    tourId: mongoose.Schema.Types.ObjectId,
    tourTitle: String,
    tourType: String, // group | individual

    pricePerPerson: Number,
    persons: Number,
    totalAmount: Number,

    note: String,

    status: {
      type: String,
      default: "pending" // pending | confirmed | cancelled
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
