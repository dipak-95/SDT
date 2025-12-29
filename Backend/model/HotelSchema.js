const mongoose = require("mongoose");

/* ================= ROOM SCHEMA ================= */
const roomSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["2-bed", "3-bed", "4-bed"],
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    totalRooms: {
      type: Number,
      default: 5,
      min: 0
    },

    bookedRooms: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/* 🔥 AVAILABLE ROOMS (AUTO) */
roomSchema.virtual("availableRooms").get(function () {
  return this.totalRooms - this.bookedRooms;
});

/* ================= HOTEL SCHEMA ================= */
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    amenities: {
      wifi: { type: Boolean, default: false },
      pool: { type: Boolean, default: false },
      meal: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      ac: { type: Boolean, default: false }
    },

    rooms: [roomSchema],

    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

/* 🔥 INDEX FOR CITY FILTER */
hotelSchema.index({ city: 1 });

module.exports = mongoose.model("Hotel", hotelSchema);
