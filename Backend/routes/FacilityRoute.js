const express = require("express");
const router = express.Router();
const ctl = require("../controller/Facilityctl");

router.get("/", ctl.getFacilities);
router.post("/", ctl.addFacility);
router.delete("/:id", ctl.deleteFacility);

module.exports = router;
