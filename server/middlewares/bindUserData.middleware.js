"use strict";

/**
 * Import JWT helper
 */
const { decodeUserToken } = require("../helpers/jwt/jwt.helper");
/**
 * Import constants
 */
const {
    ER_UNAUTHORIZED_CLIENT,
} = require("../helpers/constants/message");
/**
 * Import services
 */
const { getValidUserData } = require('../apis/users/users.controller');

const User = require('../apis/users/users.model');
/**
 * API auth middleware function
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {*}
 */
const bindUserDataMiddleware = async (req, res, next) => {
    let token = req.headers.authorization || false;

    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
        const decodedToken = decodeUserToken(token);
        const _userId = decodedToken._userId || false;
        if (_userId) {
            const userData = await getValidUserData({ _id: _userId });
            if (userData && Array.isArray(userData) && userData.length) {
                req['user'] = userData[0];
            }
        }
    }
    next();
};

module.exports = { bindUserDataMiddleware }