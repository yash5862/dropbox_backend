const multer = require('multer');
const fs = require('fs');
const utils = require('../utils');

const dir = './products-images';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'products-images/');
  },
  filename: (req, file, cb) => {
    const filename = file.originalname;
    cb(null, filename);
  }
});

const bulkproductsupload = multer({ storage });

module.exports = bulkproductsupload;
