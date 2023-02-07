const User = require('./users.model');
const APIResponse = require('../../helpers/APIResponse');
const Utils = require('../../helpers/utils');
const httpStatus = require('http-status');
const JWTHelper = require('../../helpers/jwt/jwt.helper');

/**
 * Load user and append to req.
 */
async function load(req, res, next, _id) {
  try {
    req.user = await User.findById({ _id }); // eslint-disable-line no-param-reassign

    return next();
  } catch (e) {
    return next(e);
  }
}

/**
 * Get user
 * @returns {User}
 */
async function get(req, res, next) {
  const _id = req.params._id;
  try {

    const data = await User.find({ _id });
    if (data.length === 0) {
      return res.status(httpStatus.NOT_FOUND).send(new APIResponse({},Utils.messages.USER_NOT_EXIST,httpStatus.NOT_FOUND));
    }
    res.status(httpStatus.OK).send(new APIResponse(data,Utils.messages.SUCCESS_MSG,httpStatus.OK));
  }
  catch (e) {
    return next(e);
  }
}

async function getAuthUser(req, res, next) {
  try {
    const user = await JWTHelper.getAuthUser(req.headers.authorization);
    console.log(user);
    res.status(httpStatus.OK).send(new APIResponse(user, Utils.messages.SUCCESS_MSG,httpStatus.OK));
  } catch (e) {
    next(e);
  }
}

async function getValidUserData(query) {
  try {
    let userData = await User.find({ ...query });
    return userData;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  load,
  get,
  getAuthUser,
  getValidUserData
};

