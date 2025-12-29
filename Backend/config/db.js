// const mongoose = require("mongoose");
// require("dotenv").config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.URL, {
//       dbName: process.env.DATABASE,
//       retryWrites: true,
//       serverSelectionTimeoutMS: 10000,
//       tls: true
//     });

//     console.log("✅ MongoDB Atlas connected (Mongoose)");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.Mongodb_URI) {
      throw new Error("URL not found in environment variables");
    }

    await mongoose.connect(process.env.Mongodb_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("✅ MongoDB Atlas connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

