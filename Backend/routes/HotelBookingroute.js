const router = require("express").Router();
const ctl = require("../controller/HotelBookingctl");

router.post("/create", ctl.createBooking);
router.get("/fetch",ctl.fetchBookings);
router.get(
  "/booked-dates/:hotelId/:roomType",
  ctl.getBookedDates
);
router.delete("/delete/:id", ctl.deleteBooking);



module.exports = router;
