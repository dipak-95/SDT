const mongoose = require("mongoose");

const quickEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    message: String,
    status: {
      type: String,
      enum: ["new", "contacted"],
      default: "new"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuickEnquiry", quickEnquirySchema);
