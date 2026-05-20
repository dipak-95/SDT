const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

/* ================= AUTO CREATING DIRECTORIES ================= */
const uploadDirs = [
  "uploads",
  "uploads/group-tours",
  "uploads/individual-tours",
  "uploads/hotels",
  "uploads/cars",
  "uploads/users"
];
uploadDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`ðŸ“ Created directory: ${dir}`);
  }
});

/* ================= PERFORMANCE & SECURITY ================= */
// ðŸ”’ CORS must be high up
app.use(cors({ origin: "*" }));

// ðŸ›¡ï¸ Helmet (configured to not block Cross-Origin images & data)
app.use(helmet({ 
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(compression()); // Gzip all responses

// ðŸ“ Increase limits for many high-res images
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// âœ¨ Caching & Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: '7d',
  immutable: true,
  etag: true
}));

// Simple Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* ================= DB CONNECTION ================= */
connectDB();

/* ================= ROUTES ================= */
app.get("/", (req, res) => {
  res.send("ðŸš€ Backend is running successfully");
});

// Health check for monitoring tools
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "online", 
    uptime: process.uptime(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    version: "1.2.0"
  });
});

app.use("/admin", require("./routes/route"));
app.use("/bookingtour", require("./routes/Bookingroute"));
app.use("/group-tours", require("./routes/GroupTourroute"));
app.use("/individual-tours", require("./routes/individualtourroute"));
app.use("/car-booking", require("./routes/CarBookingroute"));
app.use("/Contact", require("./routes/Contactroute"));
app.use("/Enquiry", require("./routes/QiuckEnquiryroute"));
app.use("/Dashboard", require("./routes/Dashboardroute"));
app.use("/order", require("./routes/orderroute"));
app.use("/cars", require("./routes/CarRoute"));
app.use("/car-categories", require("./routes/CarCategoryRoute"));
app.use("/car-facilities", require("./routes/CarFacilityRoute"));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 7345;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ðŸš€ Server started on port ${PORT}`);
  console.log("=== REGISTERED MODELS ===");
  mongoose.modelNames().forEach((name) => {
    const m = mongoose.model(name);
    console.log(`${name} -> ${m.collection.name}`);
  });
});

