const router = require("express").Router();
const ctl = require("../controller/Hotelctl");
const upload=require("../middleware/hotel")

router.post("/add", upload.array("images", 10), ctl.addHotel);
router.put("/:id", upload.array("images", 10), ctl.updateHotel);
router.delete("/:id", ctl.deleteHotel);
router.get("/", ctl.getHotels);
router.put("/add-rooms/:id", ctl.addMoreRooms);
router.post("/month-prices", ctl.saveMonthPrices);
router.get("/month-prices", ctl.getMonthPrices);
router.get("/calendar", ctl.getHotelCalendar);
router.get("/availability", ctl.getAvailability);


module.exports = router;
