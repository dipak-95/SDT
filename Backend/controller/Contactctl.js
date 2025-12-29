const Enquiry = require("../model/ContactSchema");

/* CREATE ENQUIRY (CLIENT) */
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry"
    });
  }
};

/* GET ALL ENQUIRIES (ADMIN) */
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
};
/* DELETE ENQUIRY (ADMIN) */
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
};
