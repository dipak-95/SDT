const express = require("express");
const router = express.Router();
const ctl = require("../controller/HotelBookingctl");

router.post("/create", ctl.createBooking);
router.get("/fetch", ctl.fetchBookings);
router.put("/status/:id", ctl.confirmBooking);
router.delete("/delete/:id", ctl.deleteBooking);

module.exports = router;

