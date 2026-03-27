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

      roomType: String,      // Primary room type
      roomCombo: String,     // Detailed combo (e.g. 2x2bed + 1x4bed)
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

      adults: { type: Number, default: 0 },
      children: { type: Number, default: 0 },

      totalAmount: Number,

      status: {
        type: String,
        default: "pending"
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("HotelBooking", hotelBookingSchema);
