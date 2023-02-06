const multer = require('multer');

const storage = multer.diskStorage({ // multers disk storage settings
  // eslint-disable-next-line
  destination: (req, file, cb) => { cb(null, './uploads/')},
  filename: (req, file, cb) => {
    const datetimestamp = Date.now();
    cb(null, `${file.fieldname}-${datetimestamp}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
  }
});
const upload = multer({ storage,
  fileFilter: (req, file, callback) => {
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
      return callback(new Error('Wrong extension type'));
    }
    return callback(null, true);
  }
}).single('file');

module.exports = upload;
