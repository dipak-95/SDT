const express = require("express");
const router = express.Router();
const orderCtl = require("../controller/orderctl");

router.post("/create", orderCtl.createOrder);

module.exports = router;
