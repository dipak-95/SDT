const City = require("../model/CitySchema");

/* ================= CRUD OPERATIONS ================= */
exports.getCities = async (req, res) => {
  try {
    const cities = await City.find({ status: true }).sort({ name: 1 });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.addCity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: "City name required" });

    const existing = await City.findOne({ name: name.trim() });
    if (existing) return res.status(400).json({ msg: "City already exists" });

    const saved = await City.create({ name: name.trim() });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteCity = async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.json({ msg: "City deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
