const Hotel = require("../model/HotelSchema");
const booking=require("../model/HotelBooking")
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
      mapLink: req.body.mapLink || "",
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
    const hotels = await Hotel.find().lean();

    for (const hotel of hotels) {
      for (const room of hotel.rooms) {

        const bookings = await booking.find({
          hotelId: hotel._id,
          roomType: room.type,
          status: "confirmed",
          checkOut: { $gt: new Date() }
        });

        const totalBooked = bookings.reduce(
          (sum, b) => sum + b.roomsBooked,
          0
        );

        room.availableRooms = Math.max(
          room.totalRooms - totalBooked,
          0
        );
      }
    }

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
    if (req.body.mapLink !== undefined) {
      hotel.mapLink = req.body.mapLink;
    }
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
/* ================= SAVE MONTH DATE WISE PRICES ================= */
exports.saveMonthPrices = async (req, res) => {
  try {
    const { hotelId, roomType, prices } = req.body;
    /*
      prices = [
        { date: "2026-01-10", price: 1000 },
        { date: "2026-01-12", price: 1500 }
      ]
    */

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    prices.forEach(p => {
      const index = hotel.datePrices.findIndex(
        dp =>
          dp.roomType === roomType &&
          new Date(dp.date).toDateString() ===
            new Date(p.date).toDateString()
      );

      if (index > -1) {
        hotel.datePrices[index].price = p.price;
      } else {
        hotel.datePrices.push({
          roomType,
          date: p.date,
          price: p.price
        });
      }
    });

    await hotel.save();
    res.json({ msg: "Month prices saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* ================= GET MONTH PRICES ================= */
exports.getMonthPrices = async (req, res) => {
  try {
    const { hotelId, roomType, month, year } = req.query;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const prices = hotel.datePrices.filter(dp =>
      dp.roomType === roomType &&
      dp.date >= start &&
      dp.date <= end
    );

    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* ================= CLIENT CALENDAR ================= */
exports.getHotelCalendar = async (req, res) => {
  try {
    const { hotelId, roomType } = req.query;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    const today = new Date();
    const end = new Date();
    end.setMonth(end.getMonth() + 2);

    const prices = hotel.datePrices.filter(dp =>
      dp.roomType === roomType &&
      dp.date >= today &&
      dp.date <= end
    );

    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAvailability = async (req, res) => {
  try {
    const { hotelId, roomType, checkIn, checkOut } = req.query;

    if (!hotelId || !roomType || !checkIn || !checkOut) {
      return res.status(400).json({ msg: "Missing parameters" });
    }

    const hotel = await Hotel.findById(hotelId).lean();
    if (!hotel) {
      return res.status(404).json({ msg: "Hotel not found" });
    }

    const room = hotel.rooms.find(r => r.type === roomType);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // ✅ get all overlapping confirmed bookings
    const bookings = await booking.find({
      hotelId,
      roomType,
      status: "confirmed",
      checkIn: { $lt: new Date(checkOut) },
      checkOut: { $gt: new Date(checkIn) }
    }).lean();

    // ✅ SUM all booked rooms
    const totalBooked = bookings.reduce(
      (sum, b) => sum + (b.roomsBooked || 0),
      0
    );

    const availableRooms = Math.max(
      0,
      room.totalRooms - totalBooked
    );

    res.json({ availableRooms });
  } catch (err) {
    console.error("Availability Error:", err);
    res.status(500).json({ msg: "Failed to fetch availability" });
  }
};

