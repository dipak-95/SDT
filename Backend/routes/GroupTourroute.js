const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const iteranary = require("../middleware/Groupiteranary");
const ctl = require("../controller/GroupTourctl");
const controller = require("../controller/GroupIteranary");

/* GROUP TOUR */
router.post("/", upload.array("images", 10), ctl.addGroupTour);
router.put("/:id", upload.array("images", 10), ctl.updateTour);
router.get("/", ctl.getGroupTours);
router.get("/:id", ctl.getSingleGroupTour);
router.get("/:id/itinerary", controller.getTourItinerary);
router.delete("/:id", ctl.deleteTour);

/* ITINERARY */
router.post(
  "/itinerary",
  iteranary.any(),
  controller.saveFullItinerary
);

module.exports = router;
