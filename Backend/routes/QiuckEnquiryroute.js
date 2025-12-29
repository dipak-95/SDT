const router = require("express").Router();
const ctrl = require("../controller/QuickEnquiryctl");

router.post("/quick-enquiry", ctrl.createQuickEnquiry);
router.get("/admin/quick-enquiry", ctrl.getQuickEnquiries);
router.delete("/admin/quick-enquiry/:id", ctrl.deleteQuickEnquiry);

module.exports = router;
