const Hotel = require("../model/HotelSchema");
const Booking = require("../model/HotelBooking");

/* ================= USER CREATE BOOKING ================= */
exports.createBooking = async (req, res) => {
  console.log("BOOKING BODY:", req.body);

  try {
    const {
      hotelId,
      roomType,
      user,
      checkIn,
      checkOut,
      roomsBooked
    } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel)
      return res.status(404).json({ msg: "Hotel not found" });

    const room = hotel.rooms.find(r => r.type === roomType);
    if (!room)
      return res.status(404).json({ msg: "Room not found" });

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    let totalAmount = 0;
    let nights = 0;

    // 🔥 calculate price date-wise
    for (
      let d = new Date(start);
      d < end;
      d.setDate(d.getDate() + 1)
    ) {
      const priceObj = hotel.datePrices.find(
        p =>
          p.roomType === roomType &&
          new Date(p.date).toDateString() ===
            d.toDateString()
      );

      if (!priceObj) {
        return res.status(400).json({
          msg: `Price not set for ${d.toDateString()}`
        });
      }

      totalAmount += priceObj.price * roomsBooked;
      nights++;
    }

    const booking = await Booking.create({
      hotelId: hotel._id,
      hotelName: hotel.name,
      city: hotel.city,
      location: hotel.location,
      roomType,
      user,
      checkIn,
      checkOut,
      roomsBooked,
      nights,
      totalAmount,
      status: "pending"
    });

    res.status(201).json({
      msg: "Booking request submitted (pending)",
      booking
    });
  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    res.status(500).json({ msg: "Booking failed" });
  }
};

/* ================= ADMIN CONFIRM BOOKING ================= */
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ msg: "Booking not found" });

    // ✅ make API idempotent
    if (booking.status === "confirmed") {
      return res.json({
        msg: "Booking already confirmed",
        booking
      });
    }

    const hotel = await Hotel.findById(booking.hotelId);
    if (!hotel)
      return res.status(404).json({ msg: "Hotel not found" });

    const room = hotel.rooms.find(
      r => r.type === booking.roomType
    );
    if (!room)
      return res.status(404).json({ msg: "Room not found" });

    // 🔒 SAFE availability check
    const available =
      Math.max(room.totalRooms - room.bookedRooms, 0);

    if (booking.roomsBooked > available) {
      return res.status(400).json({
        msg: "Rooms no longer available"
      });
    }

    room.bookedRooms += booking.roomsBooked;
    await hotel.save();

    booking.status = "confirmed";
    await booking.save();

    res.json({ msg: "Booking confirmed", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Confirmation failed" });
  }
};

/* ================= FETCH BOOKINGS (ADMIN) ================= */
exports.fetchBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch bookings" });
  }
};

/* ================= DELETE BOOKING ================= */
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ msg: "Booking not found" });

    // 🔁 restore only if confirmed
    if (booking.status === "confirmed") {
      const hotel = await Hotel.findById(booking.hotelId);
      if (hotel) {
        const room = hotel.rooms.find(
          r => r.type === booking.roomType
        );
        if (room) {
          room.bookedRooms -= booking.roomsBooked;
          if (room.bookedRooms < 0) room.bookedRooms = 0;
          await hotel.save();
        }
      }
    }

    await booking.deleteOne();
    res.json({ msg: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};

