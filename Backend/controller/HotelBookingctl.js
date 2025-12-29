const Hotel = require("../model/HotelSchema");
const Booking = require("../model/HotelBooking");

exports.createBooking = async (req, res) => {
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
    if (!hotel) return res.status(404).json({ msg: "Hotel not found" });

    const room = hotel.rooms.find(r => r.type === roomType);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    const available = room.totalRooms - room.bookedRooms;

    if (roomsBooked > available) {
      return res
        .status(400)
        .json({ msg: "Not enough rooms available" });
    }

    // 🔻 DECREASE AVAILABILITY
    room.bookedRooms += roomsBooked;
    await hotel.save();

    const nights =
      (new Date(checkOut) - new Date(checkIn)) /
      (1000 * 60 * 60 * 24);

    const booking = await Booking.create({
      hotelId: hotel._id,
      hotelName: hotel.name,
      city: hotel.city,
      location: hotel.location,
      roomType,
      roomPrice: room.price,
      user,
      checkIn,
      checkOut,
      roomsBooked,
      nights,
      totalAmount: nights * room.price * roomsBooked
    });

    res.status(201).json({
      msg: "Booking confirmed",
      booking
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Booking failed" });
  }
};

/* ================= FETCH BOOKINGS (ADMIN) ================= */
exports.fetchBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch bookings" });
  }
};
exports.getBookedDates = async (req, res) => {
  const { hotelId, roomType } = req.params;

  const bookings = await Booking.find({
    hotelId,
    roomType // 🔥 FILTER BY ROOM TYPE
  });

  let dates = [];

  bookings.forEach(b => {
    let current = new Date(b.checkIn);
    const end = new Date(b.checkOut);

    while (current < end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
  });

  res.json(dates);
};
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ msg: "Booking not found" });

    // 🔁 Restore room availability
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

    await booking.deleteOne();
    res.json({ msg: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};

