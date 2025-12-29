require("dotenv").config();

const express = require("express");
const port = 1005;
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(cors({
//   origin: function (origin, callback) {
//     const allowedOrigins = [
//       process.env.CLIENT_URL,
//       process.env.ADMIN_URL
//     ];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS error"));
//     }
//   },
//   credentials: true
// }));
app.use(cors({ origin: "*" }));

connectDB();

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


app.listen(port,"0.0.0.0", () => {
  console.log(`Server Started Successfully on port ${port}`);
  console.log("=== REGISTERED MODELS ===");
  mongoose.modelNames().forEach(name => {
    const m = mongoose.model(name);
    console.log(`${name} -> ${m.collection.name}`);
  });
});
