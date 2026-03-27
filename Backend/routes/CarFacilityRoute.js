const express = require("express");
const router = express.Router();
const { getFacilities, addFacility, deleteFacility } = require("../controller/CarFacilityctl");

router.get("/", getFacilities);
router.post("/", addFacility);
router.delete("/:id", deleteFacility);

module.exports = router;
