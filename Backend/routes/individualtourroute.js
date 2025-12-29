const express = require("express");
const router = express.Router();

/* UPLOAD MIDDLEWARE */
const uploadTourImages = require("../middleware/multerIndividuals");
const uploadItineraryImages = require("../middleware/Individualiteranary");

/* CONTROLLERS */
const tourCtl = require("../controller/individualctl");
const itineraryCtl = require("../controller/IndividualIteranaryctl");

/* ================= INDIVIDUAL TOURS ================= */
router.get("/", tourCtl.getIndividualTours);

router.post(
  "/",
  uploadTourImages.array("images", 10), // 🔥 FIX
  tourCtl.addIndividualTour
);

router.put(
  "/:id",
  uploadTourImages.array("images", 10), // 🔥 FIX
  tourCtl.updateTour
);

router.delete("/:id", tourCtl.deleteTour);
router.get("/:id", tourCtl.getSingleIndividualTour);

/* ================= INDIVIDUAL ITINERARY ================= */
router.post(
  "/individualitinerary",
  uploadItineraryImages.any(),
  itineraryCtl.saveFullItinerary
);

router.get("/:id/individualitinerary", itineraryCtl.getTourItinerary);

module.exports = router;
