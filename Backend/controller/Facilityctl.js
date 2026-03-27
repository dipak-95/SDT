const Facility = require("../model/FacilitySchema");

/* ================= CRUD OPERATIONS ================= */
exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find({ status: true }).sort({ name: 1 });
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.addFacility = async (req, res) => {
  try {
    const { name, iconName } = req.body;
    if (!name || !iconName) {
      return res.status(400).json({ msg: "Name and Icon required" });
    }

    const existing = await Facility.findOne({ name: name.trim() });
    if (existing) return res.status(400).json({ msg: "Facility already exists" });

    const saved = await Facility.create({ name: name.trim(), iconName });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    await Facility.findByIdAndDelete(req.params.id);
    res.json({ msg: "Facility deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
