const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
      enum: ["group", "individual", "hotel", "car"],
    },

    status: {
      type: String,
      enum: ["confirmed", "enquiry", "pending", "cancelled"],
      default: "enquiry",
    },

    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
