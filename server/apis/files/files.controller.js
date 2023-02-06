const files = require('./files.model');
const APIResponse = require('../../helpers/APIResponse');
const Utils = require('../../helpers/utils');
const httpStatus = require('http-status');

async function list(req, res, next) {
  try {
    const data = await files.find({ createdBy: req._userId });
    if (data.length === 0) {
      return res.status(httpStatus.NOT_FOUND).send(new APIResponse({}, Utils.messages.NOT_FOUND, httpStatus.NOT_FOUND));
    }
    res.status(httpStatus.OK).send(new APIResponse(data,Utils.messages.SUCCESS_MSG,httpStatus.OK));
  }
  catch (e) {
    return next(e);
  }
}

async function get(req, res, next) {
  const _id = req.params._id;
  try {
    const data = await files.find({ _id, createdBy: req._userId });
    if (data.length === 0) {
      return res.status(httpStatus.NOT_FOUND).send(new APIResponse({}, Utils.messages.NOT_FOUND, httpStatus.NOT_FOUND));
    }
    res.status(httpStatus.OK).send(new APIResponse(data,Utils.messages.SUCCESS_MSG,httpStatus.OK));
  }
  catch (e) {
    return next(e);
  }
}

async function create(req, res, next) {
  try {
    console.log('req', req);
    // const data = await files.find({ _id, createdBy: req._userId });
    // if (data.length === 0) {
    //   return res.status(httpStatus.NOT_FOUND).send(new APIResponse({}, Utils.messages.NOT_FOUND, httpStatus.NOT_FOUND));
    // }
    res.status(httpStatus.OK).send(new APIResponse({},Utils.messages.SUCCESS_MSG,httpStatus.OK));
  }
  catch (e) {
    return next(e);
  }
}

async function _delete(req, res, next) {
  const _id = req.params._id;
  try {
    const data = await files.find({ _id, createdBy: req._userId });
    if (data.length === 0) {
      return res.status(httpStatus.NOT_FOUND).send(new APIResponse({}, Utils.messages.NOT_FOUND, httpStatus.NOT_FOUND));
    }
    res.status(httpStatus.OK).send(new APIResponse(data,Utils.messages.SUCCESS_MSG,httpStatus.OK));
  }
  catch (e) {
    return next(e);
  }
}

module.exports = {
  list,
  get,
  _delete,
  create
};

