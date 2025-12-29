const QuickEnquiry = require("../model/QuickEnquiry");

/* CREATE */
exports.createQuickEnquiry = async (req, res) => {
  try {
    const enquiry = await QuickEnquiry.create(req.body);
    res.status(201).json({ success: true, enquiry });
  } catch {
    res.status(500).json({ success: false, message: "Failed" });
  }
};

/* FETCH (ADMIN) */
exports.getQuickEnquiries = async (req, res) => {
  const enquiries = await QuickEnquiry.find().sort({ createdAt: -1 });
  res.json(enquiries);
};

/* DELETE */
exports.deleteQuickEnquiry = async (req, res) => {
  await QuickEnquiry.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
