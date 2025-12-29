// const dotenv = require("dotenv");
// dotenv.config();

// const { MongoClient } = require("mongodb");

// const url = process.env.URL;
// const database = process.env.DATABASE;

// let client;

// const connectDB = async () => {
//   try {
//     client = new MongoClient(url);
//     await client.connect();
//     console.log("✅ Connected to MongoDB Atlas");
//     return client.db(database);
//   } catch (err) {
//     console.error("❌ Connection failed", err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      dbName: process.env.DATABASE,
      retryWrites: true,
      serverSelectionTimeoutMS: 10000,
      tls: true
    });

    console.log("✅ MongoDB Atlas connected (Mongoose)");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
