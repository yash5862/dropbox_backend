const multer = require('multer');

const storage = multer.diskStorage({ // multers disk storage settings
  // eslint-disable-next-line
  destination: (req, file, cb) => { cb(null, './uploads/')},
  filename: (req, file, cb) => {
    const datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${datetimestamp}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  }
});

module.exports = storage;
