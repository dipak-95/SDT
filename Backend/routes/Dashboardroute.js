const express = require("express");
const router = express.Router();
const dashboardCtl = require("../controller/AdminDashboardctl");

router.get("/dashboard-stats", dashboardCtl.getDashboardStats);

module.exports = router;
