const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  points: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, "At least one point is required"]
  },
  stay: {
    type: String,
    default: ""
  },
  images: {
    type: [String],
    default: []
  }
});

const groupSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupTour",
      required: true,
      unique: true
    },
    itinerary: {
      type: [daySchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "GroupTourItinerary",
  groupSchema
);
