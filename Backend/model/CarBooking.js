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
      required: false
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

    /* 💰 PAYMENT */
    paymentType: {
      type: String,
      default: "advance" // advance | full
    },
    payableAmount: {
      type: Number,
      default: 0
    },
    remainingAmount: {
      type: Number,
      default: 0
    },

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
