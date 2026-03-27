require("dotenv").config(); // works locally, ignored on Render

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({ origin: "*" }));

/* ================= DB CONNECTION ================= */
connectDB();

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully");
});

app.use("/admin", require("./routes/route"));
app.use("/bookingtour", require("./routes/Bookingroute"));
app.use("/group-tours", require("./routes/GroupTourroute"));
app.use("/individual-tours", require("./routes/individualtourroute"));
app.use("/hotels", require("./routes/Hotelroute"));
app.use("/car-booking", require("./routes/CarBookingroute"));
app.use("/bookings", require("./routes/HotelBookingroute"));
app.use("/Contact", require("./routes/Contactroute"));
app.use("/Enquiry", require("./routes/QiuckEnquiryroute"));
app.use("/Dashboard", require("./routes/Dashboardroute"));
app.use("/order", require("./routes/orderroute"));
app.use("/cars", require("./routes/CarRoute"));
app.use("/cities", require("./routes/CityRoute"));
app.use("/facilities", require("./routes/FacilityRoute"));
app.use("/car-categories", require("./routes/CarCategoryRoute"));
app.use("/car-facilities", require("./routes/CarFacilityRoute"));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 7345;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log("=== REGISTERED MODELS ===");
  mongoose.modelNames().forEach((name) => {
    const m = mongoose.model(name);
    console.log(`${name} -> ${m.collection.name}`);
  });
});
