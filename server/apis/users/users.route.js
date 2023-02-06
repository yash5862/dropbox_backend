const express = require('express');
const usersCtrl = require('./users.controller');
const router = express.Router(); // eslint-disable-line new-cap
const { apiAuthMiddleware } = require("../../middlewares/auth.middleware");
const { bindUserDataMiddleware } = require("../../middlewares/bindUserData.middleware");

router.route('/auth')
  /** GET /api/users/auth - Get user */
  .get([apiAuthMiddleware, bindUserDataMiddleware], usersCtrl.getAuthUser);

router.route('/:_id')
  /** GET /api/users/:id - Get user */
  .get(usersCtrl.get)

router.param('_id', usersCtrl.load);

module.exports = router;
         