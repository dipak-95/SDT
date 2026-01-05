const mongoose = require("mongoose");

const daySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  points: {
    type: [String],
    required: true
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

const individualSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IndividualTour",
      required: true,
      unique: true
    },
    itinerary: [daySchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "IndividualTourItinerary",
  individualSchema
);
