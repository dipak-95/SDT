const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' }); // Load .env from parent dir

const GroupTour = require('../model/GroupTourShema');
const IndividualTour = require('../model/IndividualTourSchema');
const Booking = require('../model/BookingSchema');
const HotelBooking = require('../model/HotelBooking');
const CarBooking = require('../model/CarBooking');
const QuickEnquiry = require('../model/QuickEnquiry');
const Contact = require('../model/ContactSchema');
const Hotel = require('../model/HotelSchema');
const Car = require('../model/CarSchema');
// Other models to clear
const GroupIteranary = require('../model/GroupIteranary');
const IndividualIteranary = require('../model/IndividualIteranary');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI not found in .env");
    process.exit(1);
}

console.log("Connecting to MongoDB...");
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected Successfully.");

    // Keep top 3 group tours and top 1 individual tour
    const gList = await GroupTour.find().sort({ _id: -1 });
    const keepG = gList.slice(0, 3).map(t => t._id);

    const iList = await IndividualTour.find().sort({ _id: -1 });
    const keepI = iList.slice(0, 1).map(t => t._id);

    console.log(`Keeping Group IDs: ${keepG}`);
    console.log(`Keeping Individual IDs: ${keepI}`);

    // Remove Group Tours
    const delG = await GroupTour.deleteMany({ _id: { $nin: keepG } });
    console.log(`Deleted ${delG.deletedCount} other Group Tours.`);

    // Remove Individual Tours
    const delI = await IndividualTour.deleteMany({ _id: { $nin: keepI } });
    console.log(`Deleted ${delI.deletedCount} other Individual Tours.`);

    // Delete All Bookings
    await Booking.deleteMany({});
    await HotelBooking.deleteMany({});
    await CarBooking.deleteMany({});
    console.log("Deleted All Bookings.");

    // Delete Enquiries
    await QuickEnquiry.deleteMany({});
    await Contact.deleteMany({});
    console.log("Deleted All Enquiries and Contact messages.");

    // Delete Hotels and Cars fleet as per "baki sab hata do"
    await Hotel.deleteMany({});
    await Car.deleteMany({});
    console.log("Deleted All Hotels and Cars fleet.");

    // Clean itineraries
    await GroupIteranary.deleteMany({ tourId: { $nin: keepG } });
    await IndividualIteranary.deleteMany({ tourId: { $nin: keepI } });
    console.log("Cleaned up itineraries.");

    console.log("Database Cleanup complete! 🚀");
    process.exit(0);
  })
  .catch(err => {
    console.error("DB Error:", err);
    process.exit(1);
  });
