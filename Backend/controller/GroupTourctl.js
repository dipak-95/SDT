const GroupTour = require("../model/GroupTourShema");
const { deleteImagesFromDisk } = require("../utils/fileHelper");


exports.addGroupTour = async (req, res) => {
  try {
     console.log("BODY 👉", req.body);
    console.log("FILES 👉", req.files);

    const images = req.files
      ? req.files.map((file) => `/uploads/group-tours/${file.filename}`)
      : [];

    const tour = await GroupTour.create({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      
      oldPrice: Number(req.body.oldPrice),          
      discount: Number(req.body.discount || 0),
      location:req.body.location,
      images
    });

    res.status(201).json(tour);
  }catch (err) {
  console.log("================================");
  console.log("❌ ERROR NAME:", err.name);
  console.log("❌ ERROR MESSAGE:", err.message);
  console.log("❌ STACK:", err.stack);
  console.log("================================");
  res.status(500).json({ msg: err.message });
}
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await GroupTour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }

    /* ================= IMAGE UPDATE ================= */
    if (req.files && req.files.length > 0) {
      // 🔥 remove old images
      if (tour.images && tour.images.length > 0) {
        deleteImagesFromDisk(tour.images);
      }

      // 🔥 save new images
      tour.images = req.files.map(
        (file) => `/uploads/group-tours/${file.filename}`
      );
    }
    // else → keep old images automatically

    /* ================= TEXT UPDATE ================= */
    tour.title = req.body.title;
    tour.description = req.body.description;
    tour.startDate = req.body.startDate;
    tour.endDate = req.body.endDate;
    
    tour.oldPrice=req.body.oldPrice;
    tour.discount=req.body.discount;
    tour.location=req.body.location;

    await tour.save();

    res.json({
      msg: "Tour updated successfully",
      tour
    });

  } catch (err) {
    console.error("UPDATE TOUR ERROR:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.getGroupTours = async (req, res) => {
  const tours = await GroupTour.find();
  res.json(tours);
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await GroupTour.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ msg: "Group tour not found" });
    }

    // 🔥 delete images from disk
    if (tour.images && tour.images.length > 0) {
      deleteImagesFromDisk(tour.images);
    }

    // 🔥 delete document
    await GroupTour.findByIdAndDelete(req.params.id);

    res.json({ msg: "Group tour deleted successfully" });

  } catch (error) {
    console.error("DELETE GROUP TOUR ERROR:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
exports.getSingleGroupTour = async (req, res) => {
  try {
    const tour = await GroupTour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

