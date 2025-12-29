const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    day: {
      type: Number
    },
    night: {
      type: Number
    },

    oldPrice: {
      type: Number,
      required: true
    },

    discount: {
      type: Number, // ✅ FIXED (number, not string)
      default: 0
    },

    finalPrice: {
      type: Number
    },

    location: {
      type: String,
      default: "Gujarat"
    },


    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

/* 🔥 CORRECT HOOK */
tourSchema.pre("validate", function () {
  this.finalPrice = Math.round(
    this.oldPrice - (this.oldPrice * (this.discount || 0)) / 100
  );
});

module.exports = mongoose.model("GroupTour", tourSchema);
