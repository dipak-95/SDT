  const mongoose = require("mongoose");

  const hotelBookingSchema = new mongoose.Schema(
    {
      hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
      },
      hotelName: String,
      city: String,
      location: String,

      roomType: String,
      roomPrice: Number,

      user: {
        name: String,
        phone: String,
        email: String
      },

      checkIn: Date,
      checkOut: Date,
      nights: Number,
      roomsBooked: Number,

      totalAmount: Number,

      status: {
        type: String,
        enum: ["pending", "confirmed"],
        default: "pending"
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("HotelBooking", hotelBookingSchema);
