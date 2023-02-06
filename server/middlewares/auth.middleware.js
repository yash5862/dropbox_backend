"use strict";

/**
 * Import JWT helper
 */
const { decodeUserToken } = require("../helpers/jwt/jwt.helper");
/**
 * Import constants
 */
const { ER_UNAUTHORIZED_CLIENT } = require("../helpers/constants/message");
/**
 * Import services
 */
const { get } = require("../apis/users/users.controller");

const User = require("../apis/users/users.model");
const { INTERNAL_SERVER_ERROR } = require("http-status");
/**
 * API auth middleware function
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {*}
 */
const apiAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1] || false;
    const decodedToken = decodeUserToken(token);
    const _userId = decodedToken._userId || false;
    if (token) {
      if (_userId) {
        const query = {
          _id: _userId,
        };

        const user = await User.find(query);

        if (user) {
          req._userId = _userId;
          req.token = token;
          return next();
        }
      }
    }
    const apiResponse = {
      statusCode: ER_UNAUTHORIZED_CLIENT.statusCode,
      error: {
        message: ER_UNAUTHORIZED_CLIENT.message,
        code: ER_UNAUTHORIZED_CLIENT.code,
        field: ER_UNAUTHORIZED_CLIENT.field,
        type: ER_UNAUTHORIZED_CLIENT.type,
      },
    };
    return res.status(ER_UNAUTHORIZED_CLIENT.statusCode).send(apiResponse);
  } catch (error) {
    const apiResponse = {
      statusCode: INTERNAL_SERVER_ERROR,
      error: {
        message: error,
        code: INTERNAL_SERVER_ERROR,
      },
    };
    return res.status(INTERNAL_SERVER_ERROR.statusCode).send(apiResponse);
  }
};

module.exports = { apiAuthMiddleware };
