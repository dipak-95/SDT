const express = require("express");
const router = express.Router();
const ctl = require("../controller/CarBookingctl");

/* USER */
router.post("/book", ctl.createCarBooking);

/* ADMIN */
router.get("/admin", ctl.getAllCarBookings);
router.put("/admin/:id", ctl.updateCarBookingStatus);
router.delete("/admin/:id", ctl.deleteCarBooking);

module.exports = router;
