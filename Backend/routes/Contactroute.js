const express = require("express");
const router = express.Router();
const enquiryCtrl = require("../controller/Contactctl");

router.post("/enquiry", enquiryCtrl.createEnquiry);
router.get("/admin/enquiries", enquiryCtrl.getAllEnquiries);
router.delete("/admin/enquiries/:id", enquiryCtrl.deleteEnquiry);


module.exports = router;
