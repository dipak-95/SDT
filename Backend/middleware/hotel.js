const multer = require("multer");
const path = require("path");
const fs = require("fs");

const baseDir = path.join(__dirname, "..", "uploads", "hotels");

// create base folder
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const hotelName =
      req.body.name?.replace(/\s+/g, "_").toLowerCase() || "temp";

    const hotelDir = path.join(baseDir, hotelName);

    if (!fs.existsSync(hotelDir)) {
      fs.mkdirSync(hotelDir, { recursive: true });
    }

    cb(null, hotelDir);
  },

  filename: (req, file, cb) => {
    const unique =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith("image/")
      ? cb(null, true)
      : cb(new Error("Only images allowed"));
  }
});

module.exports = upload;
