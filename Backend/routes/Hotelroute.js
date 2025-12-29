const router = require("express").Router();
const ctl = require("../controller/Hotelctl");
const upload=require("../middleware/hotel")

router.post("/add", upload.array("images", 10), ctl.addHotel);
router.put("/:id", upload.array("images", 10), ctl.updateHotel);
router.delete("/:id", ctl.deleteHotel);
router.get("/", ctl.getHotels);
router.put("/add-rooms/:id", ctl.addMoreRooms);


module.exports = router;
