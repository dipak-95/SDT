const CarCategory = require("../model/CarCategorySchema");

exports.getCategories = async (req, res) => {
  try {
    const cats = await CarCategory.find();
    res.json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const cat = await CarCategory.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ msg: "Category might exist already", error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await CarCategory.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
