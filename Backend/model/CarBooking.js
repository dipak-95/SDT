const mongoose = require("mongoose");

const carBookingSchema = new mongoose.Schema(
  {
    /* 🔗 CAR REFERENCE */
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true
    },

    /* 👤 USER INFO */
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    persons: Number,

    /* 📅 JOURNEY */
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    days: Number,

    /* 💰 BILL */
    pricePerKm: Number,
    total: Number,

    note: String,

    /* 📌 STATUS */
    status: {
      type: String,
      default: "pending" // pending | confirmed | cancelled
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarBooking", carBookingSchema);
