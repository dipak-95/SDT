const express = require("express");
const router = express.Router();
const ctl = require("../controller/Cityctl");

router.get("/", ctl.getCities);
router.post("/", ctl.addCity);
router.delete("/:id", ctl.deleteCity);

module.exports = router;
