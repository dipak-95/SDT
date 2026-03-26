const Hotel = require("../model/HotelSchema");
const Booking = require("../model/HotelBooking");

/* ================= USER CREATE BOOKING ================= */
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
    if (!hotel)
      return res.status(404).json({ msg: "Hotel not found" });

    const room = hotel.rooms.find(r => r.type === roomType);
    if (!room)
      return res.status(404).json({ msg: "Room not found" });

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    /* 🔥 REAL-TIME AVAILABILITY CHECK */
    const overlapping = await Booking.find({
      hotelId,
      roomType,
      status: "confirmed",
      checkIn: { $lt: end },
      checkOut: { $gt: start }
    });

    const totalBooked = overlapping.reduce(
      (sum, b) => sum + b.roomsBooked,
      0
    );

    const availableRooms = room.totalRooms - totalBooked;

    if (roomsBooked > availableRooms) {
      return res.status(400).json({
        msg: `Only ${availableRooms} rooms left`
      });
    }

    /* 💰 PRICE CALCULATION */
    let totalAmount = 0;
    let nights = 0;

    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
      const priceObj = hotel.datePrices.find(
        p =>
          p.roomType === roomType &&
          new Date(p.date).toDateString() === d.toDateString()
      );

      if (!priceObj) {
        return res.status(400).json({
          msg: `Price not set for ${d.toDateString()}`
        });
      }

      totalAmount += priceObj.price * roomsBooked;
      nights++;
    }

    /* ✅ AUTO CONFIRMED BOOKING */
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
      status: "confirmed"   // 🔥 CHANGE HERE
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

/* ================= ADMIN CONFIRM BOOKING ================= */
exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ msg: "Booking not found" });

    // Already confirmed
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

    // 🔥 CHECK REAL-TIME AVAILABILITY FROM BOOKINGS COLLECTION
    const overlapping = await Booking.find({
      hotelId: booking.hotelId,
      roomType: booking.roomType,
      status: "confirmed",
      checkIn: { $lt: booking.checkOut },
      checkOut: { $gt: booking.checkIn }
    });

    const totalBooked = overlapping.reduce(
      (sum, b) => sum + b.roomsBooked,
      0
    );

    const availableRooms = room.totalRooms - totalBooked;

    if (booking.roomsBooked > availableRooms) {
      return res.status(400).json({
        msg: "Rooms no longer available"
      });
    }

    // ✅ JUST CONFIRM (NO bookedRooms UPDATE)
    booking.status = "confirmed";
    await booking.save();

    res.json({
      msg: "Booking confirmed successfully",
      booking
    });

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
    // await booking.deleteOne();

    await booking.deleteOne();
    res.json({ msg: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};

