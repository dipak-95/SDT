const mongoose = require("mongoose");
const GroupTourItinerary = require("../model/GroupIteranary");

/* ================= SAVE FULL ITINERARY ================= */
exports.saveFullItinerary = async (req, res) => {
  try {
    const itinerary = JSON.parse(req.body.itinerary);

    const imagesMap = {};

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const day = file.fieldname.split("_")[1];

        if (!imagesMap[day]) imagesMap[day] = [];

        imagesMap[day].push(
          `/uploads/Groupitinerary/${file.filename}`
        );
      });
    }

    const formatted = itinerary.map((dayObj) => ({
      day: dayObj.day,
      title: dayObj.title,
      points: dayObj.points,
      stay: dayObj.stay || "",   // ✅ SAFE
      images: imagesMap[dayObj.day] || []
    }));

    const saved = await GroupTourItinerary.findOneAndUpdate(
      { tourId: new mongoose.Types.ObjectId(req.body.tourId) },
      { itinerary: formatted },
      { upsert: true, new: true }
    );

    console.log("✅ SAVED GROUP ITINERARY:", saved);

    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ SAVE FULL ITINERARY ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

/* ================= GET TOUR ITINERARY ================= */
exports.getTourItinerary = async (req, res) => {
  try {
    const tourId = new mongoose.Types.ObjectId(req.params.id);

    const itineraryDoc = await GroupTourItinerary.findOne({ tourId });

    if (!itineraryDoc) {
      return res.json({ itinerary: [] }); // ✅ FIX
    }

    res.json({ itinerary: itineraryDoc.itinerary }); // ✅ FIX
  } catch (err) {
    console.error("GET ITINERARY ERROR:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
