const fs = require("fs");
const path = require("path");

const deleteImagesFromDisk = (images = []) => {
  images.forEach((imgPath) => {
    const fullPath = path.join(__dirname, "..", imgPath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  });
};

module.exports = { deleteImagesFromDisk };
