const IndividualTour = require("../model/IndividualTourSchema");
const { deleteImagesFromDisk } = require("../utils/fileHelper");

exports.getIndividualTours = async (req, res) => {
  const tours = await IndividualTour.find().sort({ createdAt: -1 });
  res.json(tours);
};

exports.addIndividualTour = async (req, res) => {
  const images = req.files?.map((f) => `/uploads/individual-tours/${f.filename}`);

  const tour = await IndividualTour.create({
    ...req.body,
    images
  });

  res.json(tour);
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await IndividualTour.findById(req.params.id);
    if (!tour) return res.status(404).json({ msg: "Tour not found" });

    // 🔥 DELETE OLD IMAGES IF NEW IMAGES UPLOADED
    if (req.files && req.files.length > 0) {
      deleteImagesFromDisk(tour.images);

      tour.images = req.files.map(
        (file) => `/uploads/individual-tours/${file.filename}`
      );
    }

    // UPDATE OTHER FIELDS
    tour.title = req.body.title;
    tour.description = req.body.description;
    tour.startDate = req.body.startDate;
    tour.endDate = req.body.endDate;
    tour.oldPrice = Number(req.body.oldPrice);
    tour.discount = Number(req.body.discount || 0);
    tour.location = req.body.location;
    await tour.save();

    res.json({ msg: "Tour updated", tour });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const tour = await IndividualTour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ msg: "Individual tour not found" });
    }

    // 🔥 delete images from disk
    if (tour.images && tour.images.length > 0) {
      deleteImagesFromDisk(tour.images);
    }

    // 🔥 delete document
    await IndividualTour.findByIdAndDelete(req.params.id);

    res.json({ msg: "Group tour deleted successfully" });

  } catch (error) {
    console.error("DELETE GROUP TOUR ERROR:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
exports.getSingleIndividualTour = async (req, res) => {
  try {
    const tour = await IndividualTour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};