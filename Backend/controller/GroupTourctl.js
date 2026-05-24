const GroupTour = require("../model/GroupTourShema");
const { deleteImagesFromDisk } = require("../utils/fileHelper");

const syncSeatsCount = (tour) => {
  const total = tour.totalSeats || 49;
  if (!tour.seats) tour.seats = [];
  if (tour.seats.length < total) {
    const currentLen = tour.seats.length;
    for (let i = currentLen + 1; i <= total; i++) {
      tour.seats.push({
        seatNumber: i,
        status: "available",
        bookingName: "",
        phone: ""
      });
    }
  } else if (tour.seats.length > total) {
    tour.seats = tour.seats.slice(0, total);
  }
  tour.bookedSeats = tour.seats.filter(s => s.status !== "available").length;
};

exports.addGroupTour = async (req, res) => {
  try {
     console.log("BODY 👉", req.body);
    console.log("FILES 👉", req.files);

    const images = req.files
      ? req.files.map((file) => `/uploads/group-tours/${file.filename}`)
      : [];

    const tour = new GroupTour({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      oldPrice: Number(req.body.oldPrice),
      discount: Number(req.body.discount || 0),
      location: req.body.location,
      images,
      includedTickets: req.body.includedTickets
        ? (Array.isArray(req.body.includedTickets)
            ? req.body.includedTickets
            : [req.body.includedTickets])
        : [],
      totalSeats: req.body.totalSeats !== undefined ? Number(req.body.totalSeats) : 49,
    });

    syncSeatsCount(tour);

    // If admin set bookedSeats during creation
    const initBooked = req.body.bookedSeats !== undefined ? Number(req.body.bookedSeats) : 0;
    if (initBooked > 0) {
      let count = 0;
      for (let i = 0; i < tour.seats.length; i++) {
        if (tour.seats[i].status === "available") {
          tour.seats[i].status = "booked_offline";
          tour.seats[i].bookingName = "Offline Booking";
          count++;
          if (count >= initBooked) break;
        }
      }
      tour.bookedSeats = tour.seats.filter(s => s.status !== "available").length;
    }

    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
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

    /* ================= TEXT UPDATE ================= */
    tour.title = req.body.title;
    tour.description = req.body.description;
    tour.startDate = req.body.startDate;
    tour.endDate = req.body.endDate;

    tour.oldPrice = req.body.oldPrice;
    tour.discount = req.body.discount;
    tour.location = req.body.location;
    
    if (req.body.totalSeats !== undefined) tour.totalSeats = Number(req.body.totalSeats);
    
    syncSeatsCount(tour);

    // Align manually modified bookedSeats counts
    if (req.body.bookedSeats !== undefined) {
      const targetBooked = Number(req.body.bookedSeats);
      const currentBookedCount = tour.seats.filter(s => s.status !== "available").length;

      if (targetBooked > currentBookedCount) {
        let diff = targetBooked - currentBookedCount;
        for (let i = 0; i < tour.seats.length; i++) {
          if (tour.seats[i].status === "available") {
            tour.seats[i].status = "booked_offline";
            tour.seats[i].bookingName = "Offline Booking";
            diff--;
            if (diff === 0) break;
          }
        }
      } else if (targetBooked < currentBookedCount) {
        let diff = currentBookedCount - targetBooked;
        for (let i = tour.seats.length - 1; i >= 0; i--) {
          if (tour.seats[i].status === "booked_offline") {
            tour.seats[i].status = "available";
            tour.seats[i].bookingName = "";
            tour.seats[i].phone = "";
            diff--;
            if (diff === 0) break;
          }
        }
      }
      tour.bookedSeats = tour.seats.filter(s => s.status !== "available").length;
    }

    // 🔥 HANDLE TICKETS
    if (req.body.includedTickets) {
      const tickets = Array.isArray(req.body.includedTickets)
        ? req.body.includedTickets
        : [req.body.includedTickets];
      tour.includedTickets = tickets;
    } else {
      tour.includedTickets = [];
    }

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
    // Also sync and save if seats aren't initialized yet
    if (!tour.seats || tour.seats.length === 0) {
      syncSeatsCount(tour);
      await tour.save();
    }
    res.json(tour);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getTourSeats = async (req, res) => {
  try {
    const tour = await GroupTour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }
    
    syncSeatsCount(tour);
    await tour.save();

    res.json({
      totalSeats: tour.totalSeats,
      bookedSeats: tour.bookedSeats,
      seats: tour.seats
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.bookSeatOffline = async (req, res) => {
  try {
    // Support both single seatNumber and array seatNumbers
    const { seatNumber, seatNumbers, bookingName, phone } = req.body;
    const numbersToBook = seatNumbers
      ? seatNumbers.map(Number)
      : seatNumber
      ? [Number(seatNumber)]
      : [];

    if (numbersToBook.length === 0) {
      return res.status(400).json({ msg: "No seat numbers provided" });
    }

    const tour = await GroupTour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }

    syncSeatsCount(tour);

    const errors = [];
    for (const sNum of numbersToBook) {
      const seat = tour.seats.find(s => s.seatNumber === sNum);
      if (!seat) { errors.push(`Seat ${sNum} not found`); continue; }
      if (seat.status !== "available") { errors.push(`Seat ${sNum} already booked`); continue; }
      seat.status = "booked_offline";
      seat.bookingName = bookingName || "Offline Booking";
      seat.phone = phone || "";
    }

    tour.bookedSeats = tour.seats.filter(s => s.status !== "available").length;
    await tour.save();

    res.json({
      msg: errors.length > 0 ? `Partially booked. Issues: ${errors.join(", ")}` : `${numbersToBook.length} seat(s) booked successfully`,
      tour
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.releaseSeatOffline = async (req, res) => {
  try {
    // Support both single seatNumber and array seatNumbers
    const { seatNumber, seatNumbers } = req.body;
    const numbersToRelease = seatNumbers
      ? seatNumbers.map(Number)
      : seatNumber
      ? [Number(seatNumber)]
      : [];

    if (numbersToRelease.length === 0) {
      return res.status(400).json({ msg: "No seat numbers provided" });
    }

    const tour = await GroupTour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ msg: "Tour not found" });
    }

    syncSeatsCount(tour);

    for (const sNum of numbersToRelease) {
      const seat = tour.seats.find(s => s.seatNumber === sNum);
      if (!seat || seat.status !== "booked_offline") continue;
      seat.status = "available";
      seat.bookingName = "";
      seat.phone = "";
    }

    tour.bookedSeats = tour.seats.filter(s => s.status !== "available").length;
    await tour.save();

    res.json({ msg: `${numbersToRelease.length} seat(s) released successfully`, tour });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

