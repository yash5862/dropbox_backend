const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
const Users = require('../users/users.model');
const APIResponse = require('../../helpers/APIResponse');
const Utils = require('../../helpers/utils');
const JWTHelper = require('../../helpers/jwt/jwt.helper');
const { loginVerify, createUser } = require('../../../config/param-validation');

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login(req, res, next) {

  try {

    const valErr = loginVerify.validate(req.body);
    if (valErr.error) return res.status(httpStatus.BAD_REQUEST).send({ message: valErr.error.message });;
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity

    // eslint-disable-next-line max-len
    const user = await Users.findOne({ $or: [{ email: req.body.email }] });
    const encryptPWD = Utils.encrypt(req.body.password);
    if (user && user.password === encryptPWD) {
      const token = JWTHelper.getJWTToken({
        _userId: user._id
      });
      
      const userdata = {
        id: user._id,
        name: user.name,
        email: user.email
      };

      return res.status(httpStatus.OK).json(new APIResponse({ token, userdata }, Utils.messages.SUCCESS_LOGIN,httpStatus.OK));
      // eslint-disable-next-line no-else-return
    }
    return res.status(httpStatus.UNAUTHORIZED).send(new APIError({},Utils.messages.INVALID_LOGIN,httpStatus.UNAUTHORIZED));
  } catch (e) {
    return res.status(httpStatus.UNAUTHORIZED).send(new APIError({},Utils.messages.INVALID_LOGIN,httpStatus.UNAUTHORIZED));
  }
}

/**
 * Create new user
 * @returns {User}
 */
 async function signup(req, res, next) {
  try {

    const valObj = createUser.validate(req.body);
    if (valObj.error) return res.status(httpStatus.BAD_REQUEST).send({ message: valObj.error.message });

    const encryptPWD = Utils.encrypt(req.body.password);
    const user = new Users({
      email: req.body.email,
      password: encryptPWD,
      name: req.body.name,
      updatedAt: new Date()
    });
    
    const userExists = await Users.findOne({ $or: [{ email: user.email }] });
    // eslint-disable-line no-unused-vars
    if (!userExists) {
      await user.save();
      const findUser = await Users.findById({ _id: user._id });
      const token = JWTHelper.getJWTToken({
        email: findUser.email,
        _userId: user.id
      });
      return res.status(httpStatus.OK).send(new APIResponse({ token, userdata: findUser }, Utils.messages.SUCCESS_INSERT,httpStatus.OK));
    } else if (userExists.email === user.email) {
      return res.status(httpStatus.BAD_REQUEST).json(new APIResponse({}, 'Email is Already Exists...', httpStatus.BAD_REQUEST));
    }
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse({}, e, httpStatus.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  login,
  signup
};
