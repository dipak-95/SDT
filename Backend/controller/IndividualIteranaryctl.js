const mongoose = require("mongoose");
const IndividualTourItinerary = require(
  "../model/IndividualIteranary"
);

/* ================= SAVE FULL ITINERARY ================= */
exports.saveFullItinerary = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // const itinerary = JSON.parse(req.body.itinerary);
    if (!req.body.itinerary) {
      return res.status(400).json({ msg: "Itinerary data missing" });
    }

    let itinerary;
    try {
      itinerary = JSON.parse(req.body.itinerary);
    } catch (e) {
      return res.status(400).json({ msg: "Invalid itinerary JSON" });
    }


    const imagesMap = {};

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const day = file.fieldname.split("_")[1];

        if (!imagesMap[day]) imagesMap[day] = [];

        imagesMap[day].push(
          `/uploads/Individualitinerary/${file.filename}`
        );
      });
    }

    const formatted = itinerary.map((dayObj) => ({
      day: dayObj.day,
      title: dayObj.title,
      points: dayObj.points,
      images: imagesMap[dayObj.day] || []
    }));

    const saved = await IndividualTourItinerary.findOneAndUpdate(
      { tourId: new mongoose.Types.ObjectId(req.body.tourId) },
      { itinerary: formatted },
      { upsert: true, new: true }
    );

    console.log("✅ SAVED INDIVIDUAL ITINERARY:", saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ SAVE FULL ITINERARY ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};


/* ================= GET ITINERARY ================= */
exports.getTourItinerary = async (req, res) => {
  try {
    const doc = await IndividualTourItinerary.findOne({
      tourId: req.params.id
    });

    res.json(doc ? doc.itinerary : []);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
