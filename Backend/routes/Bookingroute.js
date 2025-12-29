const express = require("express");
const router = express.Router();
const ctl = require("../controller/Bookingctl");

/* USER */
router.post("/book-tour", ctl.createBooking);

/* ADMIN */
router.get("/admin/bookings", ctl.getAllBookings);
router.put("/admin/bookings/:id", ctl.updateBookingStatus);
/* ADMIN */
router.delete(
  "/admin/bookings/:id",
  ctl.deleteBooking
);

module.exports = router;
