const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    seats: {
      type: Number,
      required: true
    },

    pricePerKm: {
      type: Number,
      required: true
    },

    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "cng", "electric"],
      required: true
    },

    features: {
      type: [String], // 👈 ARRAY
      default: []
    },

    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
