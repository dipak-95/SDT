// const Hotel = require("../model/HotelSchema");
// const fs = require("fs");
// const path = require("path");

// /* ================= ADD HOTEL ================= */
// exports.addHotel = async (req, res) => {
//   try {
//     console.log("FILES:", req.files);
//     console.log("BODY:", req.body);

//     const images = req.files
//       ? req.files.map(file => {
//           const relPath = file.path
//             .split("uploads")[1]
//             .replace(/\\/g, "/");
//           return `/uploads${relPath}`;
//         })
//       : [];

//     const amenities = req.body.amenities
//       ? JSON.parse(req.body.amenities)
//       : {};

//     const rooms = req.body.rooms
//       ? JSON.parse(req.body.rooms)
//       : [];

//     const hotel = await Hotel.create({
//       name: req.body.name,
//       city: req.body.city,
//       location: req.body.location,
//       price: req.body.price,
//       amenities,
//       rooms,
//       images
//     });

//     res.status(201).json(hotel);
//   } catch (err) {
//     console.error("ADD HOTEL ERROR:", err);
//     res.status(500).json({
//       msg: "Add hotel failed",
//       error: err.message
//     });
//   }
// };

// /* ================= GET HOTELS ================= */
// exports.getHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find();
//     res.json(hotels);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// /* ================= UPDATE HOTEL ================= */
// exports.updateHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ msg: "Hotel not found" });
//     }

//     /* 🔥 If new images uploaded → delete old folder */
//     if (req.files && req.files.length > 0) {
//       const oldFolder = path.join(
//         __dirname,
//         "..",
//         "uploads",
//         "hotels",
//         hotel.name.replace(/\s+/g, "_").toLowerCase()
//       );

//       if (fs.existsSync(oldFolder)) {
//         fs.rmSync(oldFolder, { recursive: true, force: true });
//       }

//       hotel.images = req.files.map(file => {
//         const relPath = file.path
//           .split("uploads")[1]
//           .replace(/\\/g, "/");
//         return `/uploads${relPath}`;
//       });
//     }

//     hotel.name = req.body.name;
//     hotel.city = req.body.city;
//     hotel.location = req.body.location;
//     hotel.price = req.body.price;
//     hotel.amenities = JSON.parse(req.body.amenities);
//     hotel.rooms = JSON.parse(req.body.rooms);

//     await hotel.save();

//     res.json(hotel);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ================= DELETE HOTEL ================= */
// exports.deleteHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ msg: "Hotel not found" });
//     }

//     /* 🔥 DELETE HOTEL IMAGE FOLDER */
//     const hotelFolder = path.join(
//       __dirname,
//       "..",
//       "uploads",
//       "hotels",
//       hotel.name.replace(/\s+/g, "_").toLowerCase()
//     );

//     if (fs.existsSync(hotelFolder)) {
//       fs.rmSync(hotelFolder, { recursive: true, force: true });
//     }

//     await hotel.deleteOne();

//     res.json({ msg: "Hotel and images deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// /* ================= ADD MORE ROOMS ================= */
// exports.addMoreRooms = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) {
//       return res.status(404).json({ msg: "Hotel not found" });
//     }

//     hotel.rooms.forEach(room => {
//       room.totalRooms += 5;
//     });

//     await hotel.save();

//     res.json({
//       msg: "Rooms added successfully",
//       hotel
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
const Hotel = require("../model/HotelSchema");
const fs = require("fs");
const path = require("path");

/* ================= ADD HOTEL ================= */
exports.addHotel = async (req, res) => {
  try {
    const images = req.files
      ? req.files.map(file => {
          const relPath = file.path
            .split("uploads")[1]
            .replace(/\\/g, "/");
          return `/uploads${relPath}`;
        })
      : [];

    const amenities = req.body.amenities
      ? JSON.parse(req.body.amenities)
      : {};

    const rooms = req.body.rooms
      ? JSON.parse(req.body.rooms)
      : [];

    const hotel = await Hotel.create({
      name: req.body.name,
      city: req.body.city.toLowerCase().trim(),
      location: req.body.location,
      amenities,
      rooms,
      images
    });

    res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({
      msg: "Add hotel failed",
      error: err.message
    });
  }
};

/* ================= GET HOTELS ================= */
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* ================= UPDATE HOTEL ================= */
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    if (req.files && req.files.length > 0) {
      hotel.images.forEach(img => {
        const filePath = path.join(__dirname, "..", img);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      hotel.images = req.files.map(file => {
        const relPath = file.path
          .split("uploads")[1]
          .replace(/\\/g, "/");
        return `/uploads${relPath}`;
      });
    }

    hotel.name = req.body.name;
    hotel.city = req.body.city.toLowerCase().trim();
    hotel.location = req.body.location;
    hotel.amenities = req.body.amenities
      ? JSON.parse(req.body.amenities)
      : hotel.amenities;
    hotel.rooms = req.body.rooms
      ? JSON.parse(req.body.rooms)
      : hotel.rooms;

    await hotel.save();
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE HOTEL ================= */
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    hotel.images.forEach(img => {
      const filePath = path.join(__dirname, "..", img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await hotel.deleteOne();
    res.json({ msg: "Hotel deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= ADD MORE ROOMS ================= */
exports.addMoreRooms = async (req, res) => {
  try {
    const { roomType, count } = req.body;

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    const room = hotel.rooms.find(r => r.type === roomType);
    if (!room) {
      return res.status(404).json({ msg: "Room type not found" });
    }

    room.totalRooms += Number(count);

    await hotel.save();

    res.json({
      msg: "Rooms added successfully",
      room
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
