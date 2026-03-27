const CarFacility = require("../model/CarFacilitySchema");

exports.getFacilities = async (req, res) => {
  try {
    const facs = await CarFacility.find();
    res.json(facs);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addFacility = async (req, res) => {
  try {
    const fac = await CarFacility.create(req.body);
    res.status(201).json(fac);
  } catch (err) {
    res.status(500).json({ msg: "Facility might exist already", error: err.message });
  }
};

exports.deleteFacility = async (req, res) => {
  try {
    await CarFacility.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
