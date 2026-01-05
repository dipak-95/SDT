const express = require("express");
const router = express.Router();
const upload = require("../middleware/Car");
const carController = require("../controller/Carctl");

/* ================= ROUTES ================= */

// ADD CAR (ADMIN)
router.post(
  "/",
  upload.array("images", 10),
  carController.addCar
);

// GET ALL (ADMIN + CLIENT)
router.get("/", carController.getCars);

// GET SINGLE
router.get("/:id", carController.getCarById);

// UPDATE CAR (ADMIN)
router.put(
  "/:id",
  upload.array("images", 10),
  carController.updateCar
);

// DELETE CAR (ADMIN)
router.delete("/:id", carController.deleteCar);

module.exports = router;
