const express = require("express");
const router = express.Router();
const orderCtl = require("../controller/orderctl");

router.post("/create", orderCtl.createOrder);
router.post("/verify", orderCtl.verifyPayment);

module.exports = router;
