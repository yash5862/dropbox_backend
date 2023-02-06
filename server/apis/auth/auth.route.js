const express = require('express');
const authCtrl = require('./auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct email and password is provided */
router.route('/login')
  .post(authCtrl.login);

router.route('/signup')
/** POST /api/auth/signup - Create new user */
.post(authCtrl.signup);

module.exports = router;
