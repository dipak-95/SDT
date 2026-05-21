const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Booking = require("./model/BookingSchema");
const CarBooking = require("./model/CarBooking");
const Order = require("./model/Dashboard");
const Contact = require("./model/ContactSchema");
const QuickEnquiry = require("./model/QuickEnquiry");

async function clearAll() {
  try {
    await connectDB();
    console.log("Cleaning collections...");
    
    await Booking.deleteMany({});
    console.log("Cleared Tour Bookings ✅");
    
    await CarBooking.deleteMany({});
    console.log("Cleared Car Bookings ✅");
    
    await Order.deleteMany({});
    console.log("Cleared Order logs ✅");
    
    await Contact.deleteMany({});
    console.log("Cleared Contacts ✅");
    
    await QuickEnquiry.deleteMany({});
    console.log("Cleared Quick Inquiries ✅");
    
    console.log("\nAll data successfully cleared! 🎉");
    process.exit(0);
  } catch (err) {
    console.error("Cleanup error:", err);
    process.exit(1);
  }
}

clearAll();
