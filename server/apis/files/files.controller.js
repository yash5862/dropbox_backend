const files = require('./files.model');
const APIResponse = require('../../helpers/APIResponse');
const Utils = require('../../helpers/utils');
const httpStatus = require('http-status');
const fs = require('fs');

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
    if (!req.files || !req.files.length) {
      return res.status(httpStatus.BAD_REQUEST).send(new APIResponse({}, "No Files sent to the request!",httpStatus.BAD_REQUEST));  
    }

    let newFiles = (req.files || []).map((file) => {
      return new files({
        name: file.filename,
        path: file.path.replace(/:/g, '/'),
        originalName: file.originalname,
        mime: file.mimetype,
        size: file.size,
        createdBy: req._userId
      })
    })

    const insertResponse = await files.insertMany(newFiles);
    res.status(httpStatus.OK).send(new APIResponse(insertResponse,Utils.messages.SUCCESS_INSERT,httpStatus.OK));
  }
  catch (e) {
    return next(e);
  }
}

async function _delete(req, res, next) {
  const _id = req.params._id;
  try {
    const fileData = await files.findOne({ _id, createdBy: req._userId });
    if (fileData.length == 0) {
      return res.status(httpStatus.NOT_FOUND).send(new APIResponse({}, Utils.messages.NOT_FOUND, httpStatus.NOT_FOUND));
    }
    const deleteFile = fileData.path;
    if (fs.existsSync(deleteFile)) {
        fs.unlink(deleteFile, async (err) => {
            if (err) {
              return next(e);
            }
            await fileData.remove();
            return res.status(httpStatus.OK).send(new APIResponse({},Utils.messages.SUCCESS_DELETE,httpStatus.OK));
        })
    } else {
      res.status(httpStatus.NOT_FOUND).send(new APIResponse({},Utils.messages.NOT_FOUND,httpStatus.OK));
    }
  }
  catch (e) {
    return next(e);
  }
}

async function _deleteBulk(req, res, next) {
  const ids = req.body.ids;
  try {

    if (!ids || !ids.length) {
      return res.status(httpStatus.BAD_REQUEST).send(new APIResponse({}, "Please provide IDs of files to be deleted", httpStatus.BAD_REQUEST));
    }

    const fileData = await files.find({ _id: { $in: ids }, createdBy: req._userId });
    if (fileData.length == 0) {
      return res.status(httpStatus.NOT_FOUND).send(new APIResponse({}, Utils.messages.NOT_FOUND, httpStatus.NOT_FOUND));
    }

    for (let i = 0; i < fileData.length; i++) {
      const file = fileData[i];
      const deleteFile = file.path;
      if (fs.existsSync(deleteFile)) {
          fs.unlink(deleteFile, async (err) => {
              if (err) {
                return next(e);
              }
              await file.remove();
          })
      } else {
        return res.status(httpStatus.NOT_FOUND).send(new APIResponse({},Utils.messages.NOT_FOUND,httpStatus.OK));
      }
    }
    return res.status(httpStatus.OK).send(new APIResponse({},Utils.messages.SUCCESS_DELETE,httpStatus.OK));
  }
  catch (e) {
    return next(e);
  }
}

module.exports = {
  list,
  get,
  _delete,
  _deleteBulk,
  create
};

