const express = require('express');
const multer = require('multer');
const filesCtrl = require('./files.controller');
const router = express.Router(); // eslint-disable-line new-cap
const { apiAuthMiddleware } = require("../../middlewares/auth.middleware");
const { bindUserDataMiddleware } = require("../../middlewares/bindUserData.middleware");
const storage = require("../../helpers/fileUploder/fileUploadConfig");

const bulkupload = multer({ storage })

router.route('/')
  /** GET /api/files - Get list of files of loggedin user */
  .get(apiAuthMiddleware, bindUserDataMiddleware, filesCtrl.list);

router.route('/')
/** POST /api/files - Create file(s) for user */
.post([apiAuthMiddleware, bindUserDataMiddleware], bulkupload.array('files'), filesCtrl.create);

router.route('/:_id')
  /** GET /api/files/:id - get details of a file */
  .get([apiAuthMiddleware, bindUserDataMiddleware], filesCtrl.get)

router.route('/:_id')
/** DELETE /api/files/:id - delete a file */
.delete([apiAuthMiddleware, bindUserDataMiddleware], filesCtrl._delete)

module.exports = router;
         